package com.imethod.core.util;

import java.sql.Timestamp;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Objects;

/**
 * @author lh
 */
public class DateTools {
    private static final String DATE = "yyyy-MM-dd";
    private static final String DATE_TIME = "yyyy-MM-dd HH:mm:ss";

    private static final SimpleDateFormat dateFormat = new SimpleDateFormat(DATE);
    private static final SimpleDateFormat dateTimeFormat = new SimpleDateFormat(DATE_TIME);

    public static Date getCurrentDateTime() {
        Date date = new Date();
        return  date;
    }

    public enum DateType {
        DATE,
        DATE_TIME
    }

    public static Timestamp getTime(String strTime) {
        return getTime(strTime, DateType.DATE);
    }

    public static String format(Date date) {
        return format(date, DateType.DATE);
    }

    public static String format(Date date, DateType dateType) {
        if (Objects.equals(dateType.name(), DateType.DATE.name())) {
            return dateFormat.format(date);
        } else if (Objects.equals(dateType.name(), DateType.DATE_TIME.name())) {
            return dateTimeFormat.format(date);
        }
        return "";
    }

    public static Timestamp getTime(String strTime, DateType dateType) {
        Date d = null;
        Timestamp timestamp = null;
        try {
            if (Objects.equals(dateType.name(), DateType.DATE.name())) {
                d = dateFormat.parse(strTime);
            } else if (Objects.equals(dateType.name(), DateType.DATE_TIME.name())) {
                d = dateTimeFormat.parse(strTime);
            }
            if (d != null) {
                timestamp = new Timestamp(d.getTime());
            }
        } catch (ParseException e) {
            ExceptionTools.unchecked(e);
        }
        return timestamp;
    }

}
