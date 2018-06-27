import { NetService } from '~/utils/net.service'
import { Inject, Debounce } from "~/core/decorator"; 
import { requestType } from "~/config/enum.config";
import { manageService } from '~/config/server/manage-service'

export class BasicCarManageService { 
  @Inject(NetService)
  private netService: NetService

  /**
   * 车辆维护树
   */
  getAllCarTreeList() {
    return this.netService.send({
      server: manageService.basicCarManagecontroller.getAllCarTreeList,
    })
  }
  /**
   * 新增品牌
   */
  addCarBrand(brandName, url) {
    return this.netService.send({
      data: {
        brandName: brandName,
        brandPhotoUrl : url,
      },
      loading: true,
      server: manageService.basicCarManagecontroller.addCarBrand,
    })
  }
  /**
   * 修改车辆品牌
   */
  editCarBrand(data) {
    return this.netService.send({
      data:data,
      loading: true,
      server: manageService.basicCarManagecontroller.editCarBrand,
    })
  }
  /**
   * 车辆品牌查看
   */
  getCarBrandById(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.getCarBrandById,
    })
  }
  /**
   * 删除车辆品牌
   */
  deleteCarBrand(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.deleteCarBrand,
    })
  }
  /**
   * 新增车系
   */
  addCarSeries(data) {
    return this.netService.send({
      data:data,
      loading:true,
      server: manageService.basicCarManagecontroller.addCarSeries,
    })
  }
  /**
   * 删除车系
   */
  deleteCarSeries(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.deleteCarSeries,
    })
  }
  /**
   * 根据id 查找车系
   */
  getCarSeriesById(id) {
    return this.netService.send({
      append:id,
      server: manageService.basicCarManagecontroller.getCarSeriesById,
    })
  }
  /**
   * 修改车系
   */
  editCarSeries(data) {
    return this.netService.send({
      data:data,
      loading:true,
      server: manageService.basicCarManagecontroller.editCarSeries,
    })
  }
  /**
   * 新增车型
   */
  addCarModel(data) {
    return this.netService.send({
      data:{
        displacement: data.carEmissions,
        diveway : data.drivingMode,
        fulyway : data.fuel,
        innerColor :data.interiorColor,
        modelColors :data.carColour,
        modelFuel : data.fuelConsumption,
        modelName : data.modelName,
        modelVolume :data.carSize,
        remark :data.remark,
        seriesId : data.seriesId,
        structure :data.carStructure,
      },
      loading:true,
      server: manageService.basicCarManagecontroller.addCarModel,
    })
  }
  /**
   * 删除车型
   */
  deleteCarModel(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.deleteCarModel,
    })
  }
  /**
   * 修改车型
   */
  editCarModel(carId, data) {
    console.log(data)
    return this.netService.send({
      data:{
        displacement: data.carEmissions,
        diveway : data.drivingMode,
        fulyway : data.fuel,
        innerColor :data.interiorColor,
        modelColors :data.carColour,
        modelFuel : data.fuelConsumption,
        modelName : data.modelName,
        modelVolume :data.carSize,
        remark :data.remark,
        structure :data.carStructure,
        referencePrice: data.referencePrice,
        id : carId
      },
      loading:true,
      server: manageService.basicCarManagecontroller.editCarModel,
    })
  }
  /**
   * 查看车型
   */
  getCarModelById(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.getCarModelById,
    })
  }
  /**
   * 根据车系id查找品牌
   */
  getCarSeriesByCarName(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.getCarSeriesByCarName,
    })
  }
  /**
   * 查找车辆配置参数列表
   */
  findCarConfigParamList(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.findCarConfigParamList,
    })
  }
  /**
   * 添加车辆配置参数
   */
  addCarConfigParamInfo(data) {
    return this.netService.send({
      data:{
        carParamName:data.name,
        carParamValue :data.comment,
        modelId:data.id, 
      },
      loading:true,
      server: manageService.basicCarManagecontroller.addCarConfigParamInfo,
    })
  }
  /**
   * 新增 车型介绍
   */
  addCarIntenduceInfo(data) {
    return this.netService.send({
      data:{
        introduceName:data.name,
        introduceUrl: data.imgall,
        remark:data.comment,
        modelId :data.id 
      },
      loading:true,
      server: manageService.basicCarManagecontroller.addCarIntenduceInfo,
    })
  }
   /**
   *  查看车型介绍
   */
  findCarIntroduceList(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.findCarIntroduceList,
    })
  }
  /**
   * 删除车型介绍
   */
  deleteCarIntenduceInfo(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.deleteCarIntenduceInfo,
    })
  }
   /**
   *  添加车辆主图
   */ 
  addCarModelPhoto(data) {
    return this.netService.send({
      data:data,
      loading:true,
      server: manageService.basicCarManagecontroller.addCarModelPhoto,
    })
  }
  /**
   * 查看车辆基本参数
   */
  getCarParams(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.getCarParams,
    })
  }
   /**
   * 删除配置参数
   */
  deleteCarConfigParam(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.deleteCarConfigParam,
    })
  }
  /**
   * 查看车辆主图
   */
  getCarModelPhotoList(id) {
    return this.netService.send({
      append:id,
      loading:true,
      server: manageService.basicCarManagecontroller.getCarModelPhotoList,
    })
  }

}