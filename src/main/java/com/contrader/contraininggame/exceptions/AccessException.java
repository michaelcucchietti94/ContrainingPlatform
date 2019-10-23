package com.contrader.contraininggame.exceptions;

public abstract class AccessException extends Exception {
    public AccessException() {
    }

    public AccessException(String message) {
        super(message);
    }
}
