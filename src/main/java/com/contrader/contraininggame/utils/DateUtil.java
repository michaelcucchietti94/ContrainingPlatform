package com.contrader.contraininggame.utils;

import java.time.LocalTime;

public class DateUtil {
    public static Long differenceFromTime(LocalTime first, LocalTime second) {
        Long seconds = 0L;
        Long offset = 0L;
        if (first.isBefore(second)) {
            return 0L;
        }

        seconds += first.getSecond();
        seconds += getMinuteInSeconds((long)first.getMinute());
        seconds += getHourInSeconds((long)first.getHour());

        offset += second.getSecond();
        offset += getMinuteInSeconds((long)second.getMinute());
        offset += getHourInSeconds((long)second.getHour());

        return seconds - offset;
    }

    private static Long getDayInSeconds() {
        return (long)(getHourInSeconds(24L));
    }
    private static Long getHourInSeconds(Long hours) {
        return (long)(hours*getMinuteInSeconds(60L));
    }
    private static Long getMinuteInSeconds(Long minutes) {
        return 60L* minutes;
    }
}
