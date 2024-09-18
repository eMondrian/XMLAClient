/*
  Copyright (c) 2023 Contributors to the  Eclipse Foundation.
  This program and the accompanying materials are made
  available under the terms of the Eclipse Public License 2.0
  which is available at https://www.eclipse.org/legal/epl-2.0/
  SPDX-License-Identifier: EPL-2.0

  Contributors: Smart City Jena

*/
import { ref } from "vue";

export function useAppConfig(appConfig: Record<string, string>) {
    const appConfigState = ref({});

    const getAppConfigState = () => {
        const storedConfig = localStorage.getItem("appConfig");
        if (storedConfig) {
            appConfigState.value = JSON.parse(storedConfig);
        } else {
            appConfigState.value = appConfig;
        }
        return appConfigState.value;
    }

    const setAppConfigState = (newConfig: any) => {
        appConfigState.value = { ...newConfig };
        localStorage.setItem("appConfig", JSON.stringify(appConfigState.value));
    }

    return {
        appConfigState,
        getAppConfigState,
        setAppConfigState,
    };
}
