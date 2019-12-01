package com.contrader.contraininggame.service;

import com.contrader.contraininggame.model.*;
import com.contrader.contraininggame.model.decorated.DomandaDecorated;
import com.contrader.contraininggame.model.test.UserTest;
import com.contrader.contraininggame.model.test.UserTestScore;
import com.contrader.contraininggame.repository.IUserTestRepository;
import com.contrader.contraininggame.service.interfaces.IUserTestService;
import com.contrader.contraininggame.service.training.TempoTestoService;
import com.contrader.contraininggame.utils.DateUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.time.LocalTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserTestService implements IUserTestService {

    @Autowired
    private IUserTestRepository repository;
    @Autowired
    private TempoTestoService timeChecker;
    @Autowired
    private RispostaDomandaService rispostaDomandaService;
    @Autowired
    private DefaultService<RispostaUtente, Long> rispostaUtenteService;
    @Autowired
    private DomandaService domandaService;
    @Autowired
    private CategoriaService categoriaService;


    private LocalTime questionGotAt;
    private final String spaceSeparator = "\\s+";


    @Override
    public void startTest(String username, String argomento, Integer level) {
        repository.addTest(username);
        repository.getTest(username)
                .setDomande(
                        domandaService.getRandomDomandeByCategory(
                                categoriaService.getCategoriaFromArgomento(argomento),
                                level
                        ).iterator());
        repository.getTest(username).setLevel(level);

    }

    @Override
    public DomandaDecorated getNextQuestion(String username) {
        UserTest t = repository.getTest(username);
        if(t == null)
            return null;

        if(t.isLastQuestion()) {
            return null;
        }

        Domanda d = t.getNextQuestion();
        t.setRisposteDomande(d, rispostaDomandaService.getByDomanda(d.getId()));

        DomandaDecorated dd = DomandaDecorated.createFromDomanda(d);
        dd.setLast(t.isLastQuestion());
        dd.setRisposte(t.getRisposteDomanda(d));


        // set initial time for calculing scores
        this.questionGotAt = LocalTime.now();

        return dd;
    }

    @Override
    public Boolean hasMoreQuestions(String username) {
        UserTest t = repository.getTest(username);
        return t != null && !t.isLastQuestion();

    }

    @Override
    public void addRisposta(RispostaUtente r) {
        if(r == null)
            return;

        r.setInsertdate(LocalDate.now());

        // Setting time to respond
        LocalTime now = LocalTime.now();
        Long seconds = DateUtil.differenceFromTime(now, questionGotAt);
        r.setSecondsForAnswering(seconds);


        repository.getTest(r.getUser().getUsername()).addRisposta(r);
    }

    @Override
    public UserTestScore finishTest(String username) {
        UserTestScore score = calculateScore(username);
        saveTestForUser(username);
        trainTheSystem(username);
        repository.removeTest(username);

        return score;
    }

    private UserTestScore calculateScore(String username) {
        List<RispostaUtente> responses = repository.getTest(username).getRisposteUtente();
        UserTestScore score = new UserTestScore();

        double partialScore[] = {0};
        responses.forEach(r -> {
            if(r.getRisposta().getCorretta()) {
                long responseScore = 100;
                r.setQuestionScore(responseScore);
                partialScore[0] += responseScore;
            } else {
                r.setQuestionScore(0L);
            }
        });

        score.setScore((long)(partialScore[0]/responses.size()));
        score.setLevel(repository.getTest(username).getLevel());
        return score;
    }

    private List<RispostaUtente> getRisposteCorrette(String username) {
        return repository.getTest(username).getRisposteUtente().stream().filter(r -> r.getRisposta().getCorretta()).collect(Collectors.toList());
    }

    private long getParoleOfDomanda(Domanda d) {
        long[] parole = {d.getTesto().split(this.spaceSeparator).length};
        rispostaDomandaService.getByDomanda(d.getId())
                .forEach(r -> {
                    parole[0] += r.getTesto().split(this.spaceSeparator).length;
                });
        return parole[0];
    }


    private void trainTheSystem(String username) {
        UserTest t = repository.getTest(username);
        List<RispostaUtente> userResponses = t.getRisposteUtente();
        userResponses.forEach(r -> {
            long parole = getParoleOfDomanda(r.getRisposta().getDomanda());
            long timeToRespond = r.getSecondsForAnswering();

            updateMachineLearning(timeToRespond, parole);
        } );
    }
    private void updateMachineLearning(long timeToRespond, long numberOfWords) {
        timeChecker.addToQueue(numberOfWords, timeToRespond);
    }

    @Transactional
    protected void saveTestForUser(String username) {
        UserTest t = repository.getTest(username);
        List<RispostaUtente> userResponses = t.getRisposteUtente();
        userResponses.forEach(r -> rispostaUtenteService.insert(r));
    }
}
