package com.contrader.contraininggame.utils.datastructures;

import java.util.ArrayList;
import java.util.List;

public class SyncQueue<DataType> {
    private List<DataType> queue = new ArrayList<>();

    public synchronized void add(DataType t) {
        queue.add(t);
    }
    public synchronized DataType get() {
        if(queue.size() == 0)
            return null;

        return queue.remove(0);
    }

    public synchronized int queueSize() {
        return queue.size();
    }
}
