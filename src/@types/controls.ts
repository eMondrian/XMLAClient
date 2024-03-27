import { type Component } from 'vue';

export interface EventItem {
  name: string;
  trigger: string;
}

export interface ComponentProps {
  component: {
    label?: string;
    title?: string;
    availableEvents?: string[];
    events?: EventItem[];
    options?: string[];
    settings?: Component;
    selectValue?: string;
  }
}