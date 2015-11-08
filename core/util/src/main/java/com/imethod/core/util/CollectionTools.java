/**
 *  Copyright (c)  2014-2020 Gaoxiaobang, Inc.
 *  All rights reserved.
 *
 *  This software is the confidential and proprietary information of Gaoxiaobang, 
 *  Inc. ("Confidential Information"). You shall not
 *  disclose such Confidential Information and shall use it only in
 *  accordance with the terms of the license agreement you entered into with Gaoxiaobang.
 */
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
