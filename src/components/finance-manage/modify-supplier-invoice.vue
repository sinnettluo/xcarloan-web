<!-- 供应商开票 -->
<template>
  <section class="component detain-details">
    <upload-voucher v-model="instrumentsPhotos" :transfer="true" :fileNumberLimit="1" ref="upload-voucher" :isShowUpload="!isView" :hiddenDelete="isView" :acceptFileType="`image/*`"></upload-voucher>
  </section>
</template>

<script lang="ts">
import Vue from "vue";
import Component from "vue-class-component";
import UploadVoucher from "~/components/common/upload-voucher.vue";
import { Form } from "iview";
import { Prop } from "vue-property-decorator";
import { Dependencies } from "~/core/decorator";
import { State, Getter, namespace } from "vuex-class";
import { FinancialQueryService } from "~/services/manage-service/financial-query.service";
import { FinancialManagementService } from "~/services/manage-service/financial-management.service";
import { DataGrid, DataGridItem } from "@zct1989/vue-component";
import { PageService } from "~/utils/page.service";

@Component({
  components: {
    DataGrid,
    DataGridItem,
    UploadVoucher
  }
})
export default class ModifySupplierInvoice extends Vue {
  @Dependencies(FinancialQueryService)
  private financialQueryService: FinancialQueryService;
  @Dependencies(FinancialManagementService)
  private financialManagementService: FinancialManagementService;

  @Prop({
    default: 0,
    type: Number
  })
  id: number;

  @Prop({
    default: "",
    type: String
  })
  url: string;

  @Prop({
    type: Boolean,
    default: false
  })
  isView: boolean;

  private dataSet: Array<any> = [];

  // 票据图片
  private instrumentsPhotos: Array<any> = [];

  /**
   *
   */
  mounted() {
    // 加载图片
    this.getCarPictureList();
  }

  /**
   * 获取图片
   */
  private getCarPictureList() {
    if (this.url) {
      let picture = [];
      picture.push({
        url: this.url,
        name: ""
      });
      this.instrumentsPhotos = picture;
    }
  }

  submit() {
    if (!this.instrumentsPhotos) return this.$Message.warning("请上传票据图片");

    return new Promise((resolve, reject) => {
      this.financialManagementService
        .financialAffirmInvoice({
          id: this.id,
          url: this.instrumentsPhotos[0].url
        })
        .subscribe(
          data => {
            this.$Message.success("操作成功！");
            resolve(true);
          },
          err => {
            this.$Message.error(err.msg);
            reject(err);
          }
        );
    });
  }
}
</script>

<style lang="less">
</style>