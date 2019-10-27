package com.contrader.contraininggame.utils.mappers.training;

import com.contrader.contraininggame.utils.mappers.Mapper;

import java.math.BigDecimal;

public class TrainingSampleMapper implements Mapper<Object[], Double> {
    @Override
    public Double apply(Object[] objects) {
        if(objects == null || objects.length != 1 || !(objects[0] instanceof BigDecimal))
            return null;

        BigDecimal b = (BigDecimal)objects[0];
        return b.doubleValue();
    }
}
