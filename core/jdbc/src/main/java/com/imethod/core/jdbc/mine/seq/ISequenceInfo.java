package com.imethod.core.jdbc.mine.seq;

public class ISequenceInfo {
    private Long maxInCache;

    private Long currInCache;

    private Integer sequenceWidth;

    public ISequenceInfo(Long currInCache, Long maxInCache, Integer sequenceWidth) {
        this.currInCache = currInCache;
        this.maxInCache = maxInCache;
        this.sequenceWidth = sequenceWidth;
    }

    public Long getMaxInCache() {
        return maxInCache;
    }

    public void setMaxInCache(Long maxInCache) {
        this.maxInCache = maxInCache;
    }

    public Long getCurrInCache() {
        return currInCache;
    }

    public void setCurrInCache(Long currInCache) {
        this.currInCache = currInCache;
    }

    public Integer getSequenceWidth() {
        return sequenceWidth;
    }

    public void setSequenceWidth(Integer sequenceWidth) {
        this.sequenceWidth = sequenceWidth;
    }
}
