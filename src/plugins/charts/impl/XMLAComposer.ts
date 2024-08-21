import type {
    AxisData,
    Composer,
    XMLASelector,
} from "@/plugins/charts/widgets/api/ChartdataComposer";
import { computed, type ComputedRef, type Ref, ref, isRef } from "vue";
import { parseRequestToTable } from "@/utils/MdxRequests/MdxRequestHelper";


export class XMLAComposer implements Composer<XMLASelector> {
    private selectorX: XMLASelector | undefined;
    private selectorY: any = {};
    private data: Ref<any> = ref({});
    private parsedData: any = {};
    private store: IStore | undefined;
    public mainAxisRotate: boolean = false;

    type: string = "XMLA";

    addSelectorY(selector: XMLASelector, axisName: string) {
        if (!selector) return;
        if (!this.selectorY[axisName]) this.selectorY[axisName] = [];

        this.selectorY[axisName].push(selector);
    }

    getSelectorsY() {
        return this.selectorY;
    }

    getSelectorY(axisName: string) {
        if (!this.selectorY[axisName]) {
            return [];
        }

        return this.selectorY[axisName];
    }

    setSelectorsY(selector: XMLASelector[], axisName) {
        if (!this.selectorY[axisName]) {
            this.selectorY[axisName] = [];
        }

        this.selectorY[axisName] = selector;
    }

    setSelectorX(selector: XMLASelector) {
        this.selectorX = selector;
    }
    getSelectorX() {
        return this.selectorX;
    }

    setData(data: Ref<any>) {
        if (isRef(data)) {
            console.log(this.store);
            // this.fetch();
            this.getData().then((e) => {
                this.data.value = e;
            });
        } else {
            this.data = data;
        }
    }
    setStore(store: BaseStore) {
        this.store = store;

        store.eventBus.on(`UPDATE:${store.id}`, async () => {
            await this.fetch();
        });
    }
    getStore() {
        return this.store;
    }

    getDataX(): ComputedRef<AxisData> | Ref<AxisData> {
        return computed(() => {
            console.log('xData', this.selectorX, this.data);
            console.log('store', this.store);

            try {
                const xData = this.data[this.selectorX!.header] || [];
                xData.__metadata = this.selectorX;

                return {
                    //@ts-ignore
                    data: this.data[this.selectorX!.header] || [],
                    title: this.selectorX?.header,
                    from: this.selectorX,
                } as AxisData;
            } catch (e) {
                return {
                    data: [],
                    title: this.selectorX?.header,
                    from: undefined,
                } as AxisData;
            }
        });
    }

    getDataY(): ComputedRef<Array<AxisData>> | Ref<Array<AxisData>> {
        return computed(() => {
            const ret: AxisData[] = [];
            const axises = Object.keys(this.selectorY);

            axises.forEach((axisName) => {
                const availableSelectors = this.selectorY[axisName].map(
                    (sel) => {
                        return {
                            header: sel.header,
                            available: !!this.data[sel.header],
                        };
                    },
                );

                this.selectorY[axisName] = this.selectorY[axisName].filter(
                    (sel) => {
                        return availableSelectors.find(
                            (e) => e.header === sel.header,
                        )?.available;
                    },
                );

                this.selectorY[axisName].forEach((sel) => {
                    try {
                        ret.push({
                            //@ts-ignore
                            data: this.data[sel.header].map((e, i) => {
                                console.log(this.selectorX);
                                if (!this.selectorX?.header) return;
                                return {
                                    y: parseInt(e),
                                    x: this.data[this.selectorX.header][i],
                                };
                            }),
                            title: sel.header,
                            from: axisName,
                        } as unknown as AxisData);
                    } catch (e) {
                        console.error(e);
                    }
                });
            });
            return ret;
        });
    }

    async getData() {
        if (!this.store) return;

        const mdxResponce = await this.store.getData();
        console.log(mdxResponce);

        if (this.mainAxisRotate) {
            return parseRequestToTable(mdxResponce, 1) as any;
        } else {
            return parseRequestToTable(mdxResponce, 0) as any;
        }
    }

    // TODO: find out why this is not working
    async fetch() {
        this.data.value = await this.getData();
    }

    async restoreState(state) {
        console.log(state.selectorY["y"]);
        this.mainAxisRotate = state.mainAxisRotate;

        await this.fetch();
        this.data.value = await this.getData();
        // this.data.value = await this.getData();
        this.selectorY = state.selectorY;
        this.selectorX = state.selectorX;
    }

    setSelectorY(selector: XMLASelector, axisName: string): void {
    }
}
