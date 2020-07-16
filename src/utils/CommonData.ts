export class CommonData {
  areaData: Area;
  seriesData: Series;
  constructor() {
    this.areaData = new Area();
    this.seriesData = new Series();
  }
}


class Area {
  areaList: any[] = [];
  areaMap: any[] = [];
  initCheckedArea: any[] = [];

  setAreaList(list: any[]) {
    this.areaList = list;
  }

  getAreaList() {
    return this.areaList;
  }

  setCheckedArea(list: any[]) {
    this.initCheckedArea = list;
  }

  getCheckedArea() {
    return this.initCheckedArea;
  }

  setAreaMap(list: any[]) {
    this.areaMap = list;
  }

  getAreaMap() {
    return this.areaMap;
  }
}

class Series {
  seriesMap: any[] = [];

  setSeriesMap(list: any[]) {
    this.seriesMap = list;
  }

  getSeriesMap() {
    return this.seriesMap;
  }
}
