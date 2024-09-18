/*
  Copyright (c) 2023 Contributors to the  Eclipse Foundation.
  This program and the accompanying materials are made
  available under the terms of the Eclipse Public License 2.0
  which is available at https://www.eclipse.org/legal/epl-2.0/
  SPDX-License-Identifier: EPL-2.0

  Contributors: Smart City Jena

*/
import { ref } from "vue";
import runtimeConfig from "@/runtimeConfig.json";

const runtimeState = ref({});

const init = () => {
    const storedConfig = localStorage.getItem("runtimeConfig");
    if (storedConfig) {
        runtimeState.value = JSON.parse(storedConfig);
    } else {
        runtimeState.value = runtimeConfig;
    }
    
    const queryString = window.location.hash.split('?')[1];
    const urlParams = new URLSearchParams(queryString);
    const keys = Array.from(urlParams.keys());
    keys.forEach((key) => {
        console.log('query url value:', urlParams.get(key));
    });
}

init();

export function useRuntimeConfig() {

    const getRuntimeState = () => {
        return runtimeState.value;
    }

    const setRuntimeState = (newConfig: any) => {
        runtimeState.value = { ...newConfig };
        localStorage.setItem("runtimeConfig", JSON.stringify(runtimeState.value));
    }

    return {
        runtimeState,
        getRuntimeState,
        setRuntimeState,
    };
}
