package com.contrader.contraininggame.model.game.support;

public class CSSColor {
    private int R, G, B;

    public CSSColor(int r, int g, int b) {
        R = r;
        G = g;
        B = b;
    }

    @Override
    public String toString() {
        String initial = "rgb(";
        String comma = ", ";
        StringBuilder builder = new StringBuilder(initial);
        builder.append(R).append(comma).append(G).append(comma).append(B).append(")");
        return builder.toString();
    }
}
