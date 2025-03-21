/*
  Copyright (c) 2023 Contributors to the  Eclipse Foundation.
  This program and the accompanying materials are made
  available under the terms of the Eclipse Public License 2.0
  which is available at https://www.eclipse.org/legal/epl-2.0/
  SPDX-License-Identifier: EPL-2.0

  Contributors: Smart City Jena

*/

export default class ValidityCheck{
    static checkContent(json:any):boolean{
        const keys = Object.keys(json);
        if (keys.includes('configurations') && keys.includes('datasources') && keys.includes('connections') && keys.includes('widgets') && keys.includes('layout')) {
            return true
        }
        return false
    }
}
