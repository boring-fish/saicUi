import Vue, { VNode } from 'vue';
import { ApiService } from '@/api';
import { CommonData } from '@/utils/CommonData';
import { Permission } from '@/utils/permission';

declare global {
  namespace JSX {
    // tslint:disable no-empty-interface
    interface Element extends VNode {}
    // tslint:disable no-empty-interface
    interface ElementClass extends Vue {}
    interface IntrinsicElements {
      [elem: string]: any;
    }
  }
  const $api: ApiService;
  const $commonData: CommonData;
  const $permission: Permission;
}
