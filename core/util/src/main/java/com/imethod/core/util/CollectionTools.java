package com.imethod.core.util;

import org.apache.commons.collections.CollectionUtils;
import org.apache.commons.lang3.ArrayUtils;

import java.util.Collection;

public class CollectionTools {

    public static boolean isEmpty(final Object[] array) {
        return ArrayUtils.isEmpty(array);
    }

    public static boolean isEmpty(Collection<?> coll) {
        return CollectionUtils.isEmpty(coll);
    }

    public static boolean isNotEmpty(Collection<?> coll) {
        return !CollectionUtils.isEmpty(coll);
    }

}
