/*
  Copyright (c) 2023 Contributors to the  Eclipse Foundation.
  This program and the accompanying materials are made
  available under the terms of the Eclipse Public License 2.0
  which is available at https://www.eclipse.org/legal/epl-2.0/
  SPDX-License-Identifier: EPL-2.0

  Contributors: Smart City Jena

*/
import {isArray} from "lodash";

export function optionalArrayToArray(el: any): any[] {
  if (Array.isArray(el)) return el;
  if (el) {
    return [el];
  }
  return [];
}

export function transposeArray(array){
  return array[0].map((_, colIndex) => array.map(row => row[colIndex]));
}

export function findMaxinArrayByField(fieldname:string|string[], arraylike:object){
  try {
    let init = 0
    return arraylike.reduce((accumulator, currentValue,currentIndex,array) => {
      let obj = array[currentIndex]
      if(isArray(fieldname)){
        for (const name of fieldname){
          obj = obj[name];
        }
      }else {
         obj = obj[fieldname];
      }
      let sint =  parseInt(obj);
      return (sint>accumulator)?sint:accumulator
    }, init);
  }
  catch (e){
    console.log(e);
    throw new Error(`${fieldname} not a key`)
  }


}

export function haveSameKeys(obj1, obj2) {
  if (typeof obj1 !== 'object' || typeof obj2 !== 'object') {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) {
    return false;
  }
  return keys1.every(key => keys2.includes(key));
}
