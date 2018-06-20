import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator";
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'
export class SysModuleService {
  @Inject(NetService)
  private netService: NetService


  /**
  * 修改资源图标
  */
  editResourceIcon(data) {
    return this.netService.send({
      server: manageService.sysModuleController.editResourceIcon,
      data
    })
  }
  /**
   * 修改资源名称
   */
  editResourceName(data) {
    return this.netService.send({
      server: manageService.sysModuleController.editResourceName,
      data
    })
  }
  /**
   * 获取角色下的所有的菜单
   */
  getRoleMenu() {
    return this.netService.send({
      server: manageService.sysModuleController.getRoleMenu,
      loading: true
    })
  }
  /**
   * 根据父id查询子类分页
   */
  findChildMenu(pid, page) {
    return this.netService.send({
      server: manageService.sysModuleController.findChildMenu,
      append: pid,
      page: page
    })
  }
}
