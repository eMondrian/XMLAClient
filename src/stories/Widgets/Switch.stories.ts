/*
  Copyright (c) 2023 Contributors to the  Eclipse Foundation.
  This program and the accompanying materials are made
  available under the terms of the Eclipse Public License 2.0
  which is available at https://www.eclipse.org/legal/epl-2.0/
  SPDX-License-Identifier: EPL-2.0

  Contributors: Smart City Jena

*/

import type { Meta, StoryObj } from "@storybook/vue3";
import { setup } from "@storybook/vue3";
import {
  createVuesticEssential,
  VaSwitch
} from "vuestic-ui";

import SwitchControl from '@/components/Controls/Switch/SwitchControl.vue';
setup(async (app) => {
  app.use(
    createVuesticEssential({
      components: {
        VaSwitch
      },
    }),
  );
});
// More on how to set up stories at: https://storybook.js.org/docs/vue/writing-stories/introduction
const meta: Meta<typeof SwitchControl> = {
  title: "Widget/StaticWidgets/SwitchControl",
  component: SwitchControl,
  tags: ["autodocs"],
  decorators: [
    () => ({
      template: '<div style="width: 300px; height: 100px; background-color: #fafafa; padding: 20px;"><story /></div>',
    }),
  ],
};

export default meta;
type Story = StoryObj<typeof meta>;
/*
 *👇 Render functions are a framework specific feature to allow you control on how the component renders.
 * See https://storybook.js.org/docs/vue/api/csf
 * to learn how to use render functions.
 */
export const Primary: Story = {
  args: {
    label: 'Next page',
    availableEvents: ["Blur", "Focus", "Update", "Click"],
    events: [{ name: 'Next page', trigger: 'Update' }],
  },
};
