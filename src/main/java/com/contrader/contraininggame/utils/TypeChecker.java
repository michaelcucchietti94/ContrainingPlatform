package com.contrader.contraininggame.utils;

import java.math.BigDecimal;
import java.math.BigInteger;

public class TypeChecker {

    public static boolean isLong(Object o) {
        try {
            Long l = (Long)o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isInteger(Object o) {
        try {
            Integer l = (Integer)o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isByte(Object o) {
        try {
            Byte l = (Byte)o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isShort(Object o) {
        try {
            Short l = (Short) o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isFloat(Object o) {
        try {
            Float l = (Float)o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isDouble(Object o) {
        try {
            Double l = (Double)o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isBigDecimal(Object o) {
        try {
            BigDecimal l = (BigDecimal)o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }
    public static boolean isBigInteger(Object o) {
        try {
            BigInteger l = (BigInteger) o;
            return true;
        } catch(Exception e) {
            return false;
        }
    }


    public static boolean isNumeric(Object o) {
        return isLong(o) || isByte(o) || isInteger(o) || isDouble(o) || isDouble(o) || isFloat(o) || isShort(o) || isBigDecimal(o) || isBigInteger(o);
    }


}

