<!--模块功能-->
<template>
  <section class="page module-function">
    <page-header title="模块功能" hidden-print hidden-export></page-header>
    <i-row class="data-form">
      <!--树-->
      <i-col :span="4" class="form-item">
        <div class="form-item-name">
          <span>模块名称</span>
        </div>
        <div class="form-item-tree">
          <i-tree :data="treeData" @on-select-change="prdTreeChange"></i-tree>
        </div>
      </i-col>
      <!--表格-->
      <i-col :span="20">
        <data-box :id="34" :columns="treeColumns" :data="treeDatabox" @on-page-change="roleReso" :page="pageService"></data-box>
      </i-col>
    </i-row>

    <template>
      <i-modal class="module-level" title="模块添加/修改" v-model="addModuleFunctionModal" width="600">
        <i-form class="form-level" :label-width="110">
          <i-form-item label="模块名称">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="排序">
            <i-select class="input">
              <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
              <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="状态">
            <i-select class="input">
              <i-option label="启用" value="启用" key="启用"></i-option>
              <i-option label="停用" value="停用" key="停用"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="权限图标">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块等级">
            <i-select class="input">
              <i-option label="一级菜单" value="一级菜单" key="一级菜单"></i-option>
              <i-option label="下级菜单" value="下级菜单" key="下级菜单"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="父级目录">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块路径(url)">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="模块编号">
            <i-input class="input"></i-input>
          </i-form-item>
          <i-form-item label="所属系统">
            <i-select class="input">
              <i-option label="进销存系统" value="进销存系统" key="进销存系统"></i-option>
              <i-option label="汽车金融系统" value="汽车金融系统" key="汽车金融系统"></i-option>
            </i-select>
          </i-form-item>
          <i-form-item label="描述">
            <i-input type="textarea" class="input"></i-input>
          </i-form-item>
          <div slot="footer">
            <i-button>取消</i-button>
            <i-button class="blueButton">确定</i-button>
          </div>
        </i-form>
      </i-modal>
    </template>

        <!--功能模块-->
        <template>
            <i-modal v-model="functionModuleModal" width="1200" title="功能模块">
                <function-module></function-module>
            </i-modal>
        </template>
        <template>
            <i-modal v-model="toViewModal" width="500" title="查看" class="check-module-modal-class">
                <check-module ref="check-module"></check-module>
            </i-modal>
        </template>
        <template>
            <i-modal v-model="modifyNameModal" width="500" title="修改资源名称" class="check-module-modal-class">
                <i-form :label-width="60" style="margin-top:20px;">
                    <i-form-item label="资源名称" prop="resoName">
                        <i-input v-model="modifyNameDataset.resourceName" :maxlength="20"></i-input>
                    </i-form-item>
                </i-form>
                <div style="text-align:right;" slot="footer">
                    <i-button @click="cancelmodifyName" class="defalut-button">取消</i-button>
                    <i-button @click="confirmmodifyName" class="blueButton">确定</i-button>
                </div>
            </i-modal>
        </template>
        <template>
            <i-modal class="modify-chart-resources check-module-modal-class" v-model="modifyIconModal" width="500" title="修改资源图标">
                <i-form class="chart-resources-itiem" :label-width="60">
                    <i-form-item label="资源图标" prop="resourceIcon">
                        <i-input v-model="modifyIconData.resourceIcon" :maxlength="15"></i-input>
                    </i-form-item>
                </i-form>
                <div class="pop-button" slot="footer">
                    <i-button @click="cancelmodifyIcon" class="defalut-button">取消</i-button>
                    <i-button @click="confirmmodifyIcon" class="blueButton">确定</i-button>
                </div>
            </i-modal>
        </template>
    </section>
</template>

<script lang="ts">
import DataBox from '~/components/common/data-box.vue'
import Page from '~/core/page'
import Component from 'vue-class-component'
import FunctionModule from '~/components/system-manage/function-module.vue'
import CheckModule from '~/components/system-manage/check-module.vue'
import { Dependencies } from '~/core/decorator'
import { Layout } from '~/core/decorator'
import { SysModuleService } from '~/services/manage-service/sys-module.service'
import { PageService } from '~/utils/page.service'

@Layout('workspace')
@Component({
  components: {
    DataBox,
    FunctionModule,
    CheckModule
  }
})
export default class ModuleFunction extends Page {
  @Dependencies(SysModuleService) private sysModuleService: SysModuleService
  @Dependencies(PageService) private pageService: PageService

  private treeData: Array<any> = []
  private treeColumns: any
  private treeDatabox: Array<Object> = []
  private addModuleFunctionModal: Boolean = false
  private functionModuleModal: Boolean = false
  private modifyNameModal: Boolean = false
  private toViewModal: Boolean = false
  private modifyIconModal: Boolean = false
  private resoPid: number = 0
  private allData: Array<any> = []
  private modifyNameDataset: any = {
    resourceName: '',
    resourceId: ''
  }
  private modifyIconData: any = {
    resourceId: '',
    resourceIcon: ''
  }
  private id: any = ''

  /**
   * 添加
   */
  addModuleFunction() {
    this.addModuleFunctionModal = true
  }
  created() {
    this.getTreeDate()
    this.treeData = []

    this.treeColumns = [
      {
        align: 'center',
        title: '操作',
        width: this.$common.getOperateWidth(3),
        fixed: 'left',
        render: (h, { row, columns, index }) => {
          return [
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.modifyIconData.resourceIcon = row.resourceIcoUrl
                    this.modifyIconData.resourceId = row.id
                    this.modifyIconModal = true
                  }
                }
              },
              '修改图标'
            ),
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                style: {
                  color: '#265EA2'
                },
                on: {
                  click: () => {
                    this.modifyNameDataset.resourceName = row.resourceName
                    this.modifyNameDataset.resourceId = row.id
                    this.modifyNameModal = true
                  }
                }
              },
              '修改名称'
            ),
            h(
              'i-button',
              {
                props: {
                  type: 'text'
                },
                on: {
                  click: () => {
                    let _toview: any = this.$refs['check-module']
                    _toview.getData(row)
                    this.toViewModal = true
                  }
                },
                style: {
                  color: '#265EA2'
                }
              },
              '查看'
            )
          ]
        }
      },
      {
        align: 'center',
        editable: true,
        key: 'resourceName',
        title: '资源名称'
      },
      {
        align: 'center',
        editable: true,
        key: 'resourceIcoUrl',
        title: '资源图标'
      },
      // {
      //   align: "center",
      //   editable: true,
      //   key: "resourceStatus",
      //   title: "状态"
      // },
      {
        align: 'center',
        editable: true,
        key: 'remark',
        title: '备注'
      }
    ]

    this.treeDatabox = [] //表格数据存储
  }


  /**
   * 取消修改资源名称
   */
  cancelmodifyName() {
    this.modifyNameModal = false
  }
  /**
   * 确定修改资源名称
   */
  confirmmodifyName() {
    this.sysModuleService.editResourceName(this.modifyNameDataset).subscribe(
      data => {
        this.$Message.success('修改成功！')
        this.modifyNameModal = false
        this.roleReso()
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }
  /**
   * 取消修改资源图标
   */
  cancelmodifyIcon() {
    this.modifyIconModal = false
  }
  /**
   * 确定修改资源图标
   */
  confirmmodifyIcon() {
    this.sysModuleService.editResourceIcon(this.modifyIconData).subscribe(
      data => {
        this.$Message.success('修改成功！')
        this.modifyIconModal = false
        this.roleReso()
      },
      ({ msg }) => {
        this.$Message.error(msg)
      }
    )
  }

  /**
   * 获取树接口
   */
  getTreeDate() {
    this.sysModuleService.getRoleMenu().subscribe(data => {
      this.allData = data
      this.resoPid = data.pid
      this.createNewTree(this.allData)
    })
  }
  /**
   * 生成树
   */
  createNewTree(allData) {
    let root = allData.filter(v => v.resourceFileType === 10029).sort(function (a, b) {
      return a.sort - b.sort
    }) // 获取树根
    this.treeData = []
    // 遍历根对象push进树中
    root.forEach(item => {
      let node1 = {
        title: item.resourceName,
        id: item.id,
        // resoSysname: item.resoSysname,
        // resoInitName: item.resoInitName,
        resoCode: item.resourceCode,
        resoLevel: item.resourceLevel,
        resourceStatus: item.resoStatus,
        resoPath: item.resourceUrl,
        // resoInitIcon: item.resoInitIcon,
        resoIcon: item.resourceIcoUrl,
        resoType: item.resourceType,
        resoFiletype: item.resourceFileType,
        resoRemark: item.remark,
        expand: true,
        children: this.getChild(item)
      }

      this.treeData.push(node1)
    })
  }
  /**
   * 获取相对根元素的子元素
   */
  getChild(item) {
    let child: any = []
    // 判断子的父id与全部数据的id相等
    this.allData.map(val => {
      if (item.id === val.resourcePid) {
        if (val.resourcePid) {
          let node2 = {
            title: val.resourceName,
            resoName: val.resourceName,
            id: val.id,
            // resoSysname: val.resoSysname,
            // resoInitName: val.resoInitName,
            resoCode: val.resourceCode,
            resoLevel: val.resourceLevel,
            resoStatus: val.resourceStatus,
            resoPath: val.resourceUrl,
            // resoInitIcon: val.resoInitIcon,
            resoIcon: val.resourceIcoUrl,
            resoType: val.resourceType,
            resoFiletype: val.resourceFileType,
            resoRemark: val.remark,
            expand: false,
            children: this.getChild(val) // 迭代产生根
          }
          child.push(node2)
        } else if (val.pid === null) {
          let node2 = {
            title: val.resourceName,
            id: val.id,
            resoName: val.resourceName,
            // resoSysname: val.resoSysname,
            // resoInitName: val.resoInitName,
            resoCode: val.resourceCode,
            resoLevel: val.resourceLevel,
            resoStatus: val.resourceStatus,
            resoPath: val.resourceUrl,
            // resoInitIcon: val.resoInitIcon,
            resoIcon: val.resourceIcoUrl,
            resoType: val.resourceType,
            resoFiletype: val.resourceFileType,
            resoRemark: val.remark,
            expand: false,
            children: this.getChild(val)
          }
          child.push(node2)
        }
      }
    })
    return child
  }
  prdTreeChange(val) {
    //   this.treeDatabox = val;
    if (val.length) {
      this.id = val[0].id
      this.roleReso()
    }
  }
  roleReso() {
    this.sysModuleService
      .findChildMenu(this.id, this.pageService)
      .subscribe(
        data => {
          this.treeDatabox = data
        },
        ({ msg }) => {
          this.$Message.error(msg)
        }
      )
  }
}
</script>

<style lang="less" scoped>
.page.module-function {
  .data-form {
    .form-item {
      border: 1px solid #dddee1;
      height: 567px;
      margin-top: 9px;
      .form-item-name {
        text-align: center;
        font-size: 14px;
        font-weight: bold;
        width: 100%;
        background: #f8f8f9;
        height: 41px;
        top: 1px;
        span {
          position: relative;
          top: 10px;
        }
      }
      .form-item-tree {
        overflow: auto;
        height: 524px;
      }
    }
  }
  .toViewModalClass {
    .ivu-modal-footer {
      display: none !important;
    }
  }
}
</style>
<style lang="less" scoped>
.module-level {
  .form-level {
    margin-top: 20px;
  }
  .input {
    width: 60%;
  }
}
</style>
<style lang="less" scoped>
.modify-chart-resources {
  .chart-resources-itiem {
    margin-top: 20px;
  }
  .pop-button {
    text-align: right;
  }
}
</style>
<style lang="less">
.page.module-function {
  .ivu-select.ivu-select-single.ivu-select-small,
  .ivu-select-selection {
    width: 80px !important;
  }
}
</style>
