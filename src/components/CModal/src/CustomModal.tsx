import { computed, defineComponent, PropType } from 'vue';
import { Modal as AModal, Spin as ASpin } from 'ant-design-vue';
import { CloseOutlined as ACloseIcon } from '@ant-design/icons-vue';
import type { ModalProps } from 'ant-design-vue/lib/modal';
import './style/customModalStyle.less';

export interface CustomModalProps extends ModalProps {
  modelValue: boolean;
  customTitle?: string;
  tips?: string;
  loading?: boolean;
  loadingText?: string;
  cancelCallback?: Function;
}

const CustomModal = defineComponent({
  name: 'CustomModal',
  props: {
    modelValue: {
      type: Boolean as PropType<CustomModalProps['modelValue']>,
      default: false,
    },
    customTitle: {
      type: String as PropType<CustomModalProps['customTitle']>,
    },
    tips: {
      type: String as PropType<CustomModalProps['tips']>,
    },
    loading: {
      type: Boolean as PropType<CustomModalProps['loading']>,
      default: false,
    },
    loadingText: {
      type: String as PropType<CustomModalProps['loadingText']>,
      default: '',
    },
    cancelCallback: {
      type: Function as PropType<CustomModalProps['cancelCallback']>,
    },
    centered: {
      type: Boolean as PropType<CustomModalProps['centered']>,
      default: true,
    },
    width: {
      type: Number as PropType<CustomModalProps['width']>,
      default: 450,
    },
  },
  emits: {
    'update:modelValue': (val: boolean) => typeof val === 'boolean',
    'update:visible': (val: boolean) => typeof val === 'boolean',
    'update:loading': (val: boolean) => typeof val === 'boolean',
    close: (val: boolean) => typeof val === 'boolean',
  },
  setup(props, { emit, attrs, slots }) {
    const show = computed({
      get: () => props.modelValue,
      set: (val: boolean) => {
        val ? emit('update:modelValue', val) : onClose();
      },
    });
    const defaultModalConfig = {
      width: 450,
      bodyStyle: {
        padding: '0 !important',
      },
      destroyOnClose: true,
      centered: true,
      maskClosable: false,
      keyboard: false,
    };
    const aModalConfig = computed(() => {
      return {
        ...attrs,
        ...defaultModalConfig,
        ...props,
        title: '',
        closable: false,
        footer: null,
      };
    });
    const pagerLoading = computed({
      get: () => props.loading,
      set: (val: boolean) => {
        emit('update:loading', val);
      },
    });
    function onClose(): void {
      if (props.cancelCallback) props.cancelCallback();
      emit('close', false);
      emit('update:modelValue', false);
    }
    return () => (
      <>
        <AModal v-model:visible={show.value} {...aModalConfig.value}>
          <ASpin spinning={pagerLoading.value} tip={props.loadingText}>
            <div class="custom-modal-root">
              <div class="custom-modal-head">
                <div class="close-icon-box">
                  <ACloseIcon
                    class="icon"
                    onClick={() => {
                      onClose();
                    }}
                  />
                </div>
                {props.customTitle && <div class="title">{props.customTitle}</div>}
                {props.tips && <div class="font tips">{props.tips}</div>}
              </div>
              {slots.default && <div class="custom-modal-centent">{slots.default()}</div>}
            </div>
          </ASpin>
        </AModal>
      </>
    );
  },
});

['confirm', 'info', 'warn', 'warning', 'error', 'success'].forEach((key) => {
  CustomModal[key] = AModal[key];
});

export default CustomModal;
