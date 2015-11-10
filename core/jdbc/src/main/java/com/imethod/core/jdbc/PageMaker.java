package com.imethod.core.jdbc;

import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;

/**
 * Created by bcaring on 15/7/10.
 */
public class PageMaker {

    //当前页
    private Long pageIndex;
    //每页显示
    private Long pageSize;
    //数据结果
    private List<Map<String, Object>> items;
    //总页面
    private Long pageMax;
    //当前数据开始行数
    private Long pageStart;
    //当前数据结束行数
    private Long pageEnd;
    //总数据量
    private Long rowCount;
    //页码数组
    private List<Long> pageArr = new ArrayList<Long>();

    private Long pagePre;

    private Long pageNext;

    public PageMaker(Long rCount, Long pIndex, Long pSize, Long pStart, List list) {
        rowCount = rCount;
        pageIndex = pIndex;
        pageSize = pSize;
        pageStart = pStart;
        pageEnd = 0l;
        BigDecimal x = BigDecimal.valueOf(rowCount);
        BigDecimal y = BigDecimal.valueOf(pageSize);
        pageMax = x.divide(y).longValue();
        if (pageMax * pageSize < rowCount) {
            pageMax = pageMax + 1;
        }
        if (list.size() > 0) {
            pageEnd = pageStart + list.size() - 1;
        }
        items = list;
        build151();
        pagePre = pageIndex > 1l ? pageIndex - 1l : pageIndex;
        pageNext = pageIndex < pageMax ? pageIndex + 1 : pageMax;
    }

    public Long getPageIndex() {
        return pageIndex;
    }

    public void setPageIndex(Long pageIndex) {
        this.pageIndex = pageIndex;
    }

    public Long getPageSize() {
        return pageSize;
    }

    public void setPageSize(Long pageSize) {
        this.pageSize = pageSize;
    }

    public List<Map<String, Object>> getItems() {
        return items;
    }

    public void setItems(List<Map<String, Object>> items) {
        this.items = items;
    }

    public Long getPageMax() {
        return pageMax;
    }

    public void setPageMax(Long pageMax) {
        this.pageMax = pageMax;
    }

    public Long getPageStart() {
        return pageStart;
    }

    public void setPageStart(Long pageStart) {
        this.pageStart = pageStart;
    }

    public Long getPageEnd() {
        return pageEnd;
    }

    public void setPageEnd(Long pageEnd) {
        this.pageEnd = pageEnd;
    }

    public Long getRowCount() {
        return rowCount;
    }

    public void setRowCount(Long rowCount) {
        this.rowCount = rowCount;
    }

    public List<Long> getPageArr() {
        return pageArr;
    }

    public void setPageArr(List<Long> pageArr) {
        this.pageArr = pageArr;
    }

    public Long getPagePre() {
        return pagePre;
    }

    public void setPagePre(Long pagePre) {
        this.pagePre = pagePre;
    }

    public Long getPageNext() {
        return pageNext;
    }

    public void setPageNext(Long pageNext) {
        this.pageNext = pageNext;
    }

    private void build151() {
        Long[] jj = new Long[]{-2l, -1l, 0l, 1l, 2l};
        for (Long a : jj) {
            Long index = pageIndex + a;
            if (1l <= index && index <= pageMax) {
                if (!pageArr.contains(pageIndex + a)) {
                    pageArr.add(pageIndex + a);
                }
            }
        }
    }
}

