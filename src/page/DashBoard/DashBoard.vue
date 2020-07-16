<template>
  <div class="dashboard-warp">
    
    <div class="closedLoop">

      <div class="loopContent">

        <!-- <div class="loopNav">
          <SideNav
            :carType='carType'
            :area='area'
            :timeRange='timeRange'
            @selectRule="onRuleChange"
          />
        </div> -->
        <!-- <div class="loopNav"></div> -->

        <div class="loopData">
          <div class="fissionContent">

            <div class="fissionLeft box-bg-border">
              <span class="border border-top-left"></span>
              <span class="border border-top-right"></span>
              <span class="border border-bottom-left"></span>
              <span class="border border-bottom-right"></span>
              <div class="social">
                <p class="socialTitle">社交化裂变</p>
                <!-- <div class="socialData"><span>{{socializeValue}}</span>亿</div> -->

                <!-- <div class="tbValue">
                  <div class="tb">同比</div>
                  <div class="tbPercentage green">
                    <span class="iconfont iconshangsheng"></span>
                    <span class="percentageData">2.04%</span>
                  </div>
                </div>

                <div class="hbValue">
                  <div class="hb">环比</div>
                  <div class="hbPercentage red">
                    <span class="iconfont iconxiajiang"></span>
                    <span class="percentageData">3.04%</span>
                  </div>
                </div>

                <div class="aimsValue">
                  <span class="publicMagrin">目标值</span>
                  <span>156.00万</span>
                </div>

                <div class="finishedValue">
                  <span class="publicMagrin">完成率</span>
                  <span class="green">92.04%</span>
                </div> -->
                   <Ratio 
                   :ratioData="socialData" 
                   :showProportion="false"
                   />
              </div>

            </div>
            <div class="fissionRight">
              
              <div class="propagation">

                <div class="propagationData box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <div class="propagationTitle">兴趣</div>
                  <div class="propagationValue">
                    <div class="billion"><span>{{propagationData.value? propagationData.value : '——' }}</span>{{propagationData.unit}}</div>

                    <div class="propagationTbdata">

                        <div class="propagationTb">同比</div>
                        <div v-if="propagationData.tb" class="propagationTbvalue" :class="propagationData.tb.startsWith('-')? 'red' : 'green'">
                            <span class="iconfont iconxiajiang" v-if="(propagationData.tb).startsWith('-')"></span>
                            <span class="iconfont iconshangsheng" v-else></span>
                            <span class="percentageData">{{propagationData.tb | negative}}</span>
                        </div>
                        <div v-else>—</div>

                    </div>

                    <div class="propagationTbdata"> 

                         <div class="propagationTb">环比</div>
                         <div v-if="propagationData.hb" class="propagationTbvalue " :class="propagationData.hb.startsWith('-')? 'red' : 'green'" >
                          <span class="iconfont iconxiajiang" v-if="(propagationData.hb).startsWith('-')"></span>
                          <span class="iconfont iconshangsheng" v-else></span>
                          <span class="percentageData">{{propagationData.hb | negative}}</span>
                         </div>
                        <div v-else>—</div>
                    </div>

                    <div class="propagationAims">
                      <span class="propagationaimsValue">进度目标值</span>
                      <span>{{propagationData.aims? propagationData.aims : '—' }}</span>
                      </div>

                    <div class="propagationAims">
                      <span class="propagationaimsValue">完成率</span>
                      <span :class="propagationData.finished? 'green' : ''">{{propagationData.finished? propagationData.finished : '—'}}</span>
                    </div>

                  </div>
                </div>
                <div class="propagationIcon">
                  <div class="propagationTop">
                       <div class="iconColor o">
                         <div class="deposit publicPropagetion"></div>
                         已下单-O
                       </div>
                       <div class="iconColor h">
                         <div class="publicPropagetion"></div>
                         7天内订车-H
                       </div>
                       <div class="iconColor a">
                         <div class="publicPropagetion"></div>
                         15天内订车-A
                       </div>
                       <div class="iconColor aimsBgcolor">
                         <div class="publicPropagetion"></div>
                         目标
                       </div>
                  </div>

                  <div class="propagationBottom">
                      <div class="iconColor b">
                        <div class="publicPropagetion"></div>
                        30天内订车-B
                      </div>
                      <div class="iconColor c">
                        <div class="publicPropagetion"></div>
                        1-3个月订车-C
                      </div>
                      <div class="iconColor n">
                        <div class="publicPropagetion"></div>
                       3个月以上订车-N
                      </div>
                  </div>

                </div>

              </div>
              <div class="channelData">
                <div class="contact box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <div class="contactContent">
                    <div class="content">
                      <div class="contactTitle">厂方分配</div>
                      <Ratio :ratioData="contactRatiodata"
                            :showProportion="false"
                      />
                    </div>

                    <div class="publicEchartStyle" ref="contactEchart">
                        <!-- <div ref="contactEchart"></div> -->

                    </div>
                  </div>

                </div>
                <div class="verticalMedia box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                      <div class="verticalMediaContent">
                        <div class="content">
                          <div class="publictextStyle">垂媒</div>
                          <Ratio :ratioData="verticalRatiodata"
                                  :showProportion="false"
                          />
                        </div>
                        <div class="publicEchartStyle" ref="verticalMediaEchart"></div>
                      </div>
                </div>
                <div class="customers box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <!-- <div class="customersContent"></div> -->
                  <div class="outreach">
                    <div class="content">
                      <div class="publictextStyle">外拓获客</div>
                      <Ratio :ratioData="outreachRatiodata"
                            :showProportion="false"
                      />                    
                    </div>
                    <div class="publicEchartStyle" ref="outreachEchart"></div>
                  </div>

                  <div class="natural">
                    <div class="content">
                      <div class="publictextStyle">自然获客</div>
                      <Ratio :ratioData="naturalRatiodata"
                            :showProportion="false"
                      />
                    </div>
                    <div class="publicEchartStyle" ref="naturalEchart"></div>
                  </div>
                </div>
                <!-- <div class="commerce box-bg-border">
                  <span class="border border-top-left"></span>
                  <span class="border border-top-right"></span>
                  <span class="border border-bottom-left"></span>
                  <span class="border border-bottom-right"></span>
                  <div class="dianshang">
                      <div class="publictextStyle">电商</div>
                      <Ratio :ratioData="shopkeeperRatiodata" />
                     <div class="publicEchartStyle" ref="dianshangEchart"></div>
                  </div>
                  <div class="huokeyun">
                       <div class="publictextStyle">获客云</div>
                      <Ratio :ratioData="huokeyunData"/>
                     <div class="publicEchartStyle" ref="huokeyunEchart"></div>
                  </div>
                </div> -->
              </div>

            </div>

          </div>

          <div class="clueAllocation box-bg-border">
            <span class="border border-top-left"></span>
            <span class="border border-top-right"></span>
            <span class="border border-bottom-left"></span>
            <span class="border border-bottom-right"></span>          
            <div class="clueAllocationTitle">意向</div>
            <el-button  v-if="brandName === '名爵'" type="primary" class="intention-detail" @click="jump">意向明细<i class="el-icon-arrow-right el-icon--right"></i></el-button>
            <div class="clueAllocationValue">
              <div class="thousand"><span class="blue">{{clueAllocationData.value? clueAllocationData.value : '——'}}</span>{{clueAllocationData.unit}}</div>

              <div class="clueAllocationTb">
                <div class="publicMarginRight">同比</div>
                  <div v-if="clueAllocationData.tb" class="propagationTbvalue" :class="clueAllocationData.tb.startsWith('-')? 'red' : 'green'">
                      <span class="iconfont iconxiajiang" v-if="(clueAllocationData.tb).startsWith('-')"></span>
                      <span class="iconfont iconshangsheng" v-else></span>
                      <span class="percentageData">{{clueAllocationData.tb | negative}}</span>
                  </div>
                  <div v-else>—</div>
              </div>

              <div class="clueAllocationHb">
                  <div class="publicMarginRight">环比</div>
                  <div v-if="clueAllocationData.hb" class="propagationTbvalue" :class="clueAllocationData.hb.startsWith('-')? 'red' : 'green'">
                      <span class="iconfont iconxiajiang" v-if="(clueAllocationData.hb).startsWith('-')"></span>
                      <span class="iconfont iconshangsheng" v-else></span>
                      <span class="percentageData">{{clueAllocationData.hb | negative}}</span>
                  </div>
                  <div v-else>—</div>
              </div>
              <div class="clueAllocationAims">
                <span class="publicMarginRight enlarge">进度目标值</span>
                <span class="enlarge">{{clueAllocationData.aims ? clueAllocationData.aims : '—'}}</span>
              </div>
              <div class="clueAllocationFinished">
                <span class="publicMarginRight enlarge">完成率</span>
                <span class="enlarge">{{clueAllocationData.finished ? clueAllocationData.finished : '—'}}</span>
              </div>
            </div>
          </div>

            <!-- r标 -->
          <div class="specificDistribution" v-show="showR">
            <div class="specificTop">

              <div class="nurture">

                <div class="nurtureContent">

                  <div class="nurtureValue">
                    <div class="publictextStyle">培育池</div>
                    <!-- <div><span class="blue">49.19</span>万</div> -->
                    <Ratio 
                    :ratioData="publicRatioData" 
                    :showProportion="false"
                    />
                  </div>
                  <div class="nurtureEchart" ref="nurtureEchart"></div>
                </div>
                <div class="usersIcon" @click="changeNurtureModal = true"></div>
              </div>

              <div class="Rwang">
                <div class="publicContentStyle">
                  <div class="publictextStyle">R-Friend体验服务</div>
                    <div><span class="blue">{{rFriendData.value}}</span>万</div>
                    <div class="RwangTb">

                      <div class="publicMarginRight">同比</div>

                      <div class="green">
                         <span class="iconfont iconshangsheng"></span>
                         <span class="publicMarginLeft">{{rFriendData.tb}}</span>
                      </div>

                      <div class="Rwangtims">
                        <span class="publicPaddingright">进度目标值</span>
                        <span>{{rFriendData.aims}}</span>
                      </div>

                    </div>

                    <div class="RwangTb">
                        <div class="publicMarginRight">环比</div>

                        <div class="green">
                         <span class="iconfont iconshangsheng"></span>
                         <span class="publicMarginLeft">{{rFriendData.hb}}</span>
                        </div>

                        <div class="Rwangtims">
                            <span class="publicPaddingright">完成率</span>
                            <span class="red">{{rFriendData.finished}}</span>
                       </div>
                    </div>

                    <div class="average">
                      <span>平均转化周期</span>
                      <span class="tian">{{rFriendData.average}}</span>
                    </div>
                </div>
              </div>

              
              <div class="offline">
                  <div class="publicContentStyle">
                       <div class="publictextStyle">线下体验中心到店</div>
                       <div><span class="blue">{{offlineData.value}}</span>万</div>
                       <div class="RwangTb">

                         <div class="publicMarginRight">同比</div>

                        <div class="green">
                         <span class="iconfont iconshangsheng"></span>
                         <span class="publicMarginLeft">{{offlineData.tb}}</span>
                        </div>

                        <div class="Rwangtims">
                        <span class="publicPaddingright">进度目标值</span>
                        <span>{{offlineData.aims}}</span>
                        </div>

                      </div>

                    <div class="RwangTb">
                        <div class="publicMarginRight">环比</div>

                        <div class="green">
                         <span class="iconfont iconshangsheng"></span>
                         <span class="publicMarginLeft">{{offlineData.hb}}</span>
                        </div>

                        <div class="Rwangtims">
                            <span class="publicPaddingright">完成率</span>
                            <span class="red">{{offlineData.finished}}</span>
                       </div>
                    </div>

                    <div class="average">
                      <span>平均转化周期</span>
                      <span class="tian">{{offlineData.average}}</span>
                    </div>
                </div>
              </div>
            </div>

            <div class="specificBottom">
              <div class="totalusers">
                <div class="publictextStyle">总成交用户数</div>
                <!-- <div><span class="blue">36.29</span>亿</div> -->
                <div class="totalusersValue">
                      <Ratio 
                      :ratioData="publicRatioData"
                      :showProportion="false"
                      />
                    <div class="cycle">
                      <div class="intention">平均转化周期</div>
                      <div class="intention"><span>高意向</span><span class="publicCycleColor">{{rUsersDealData.high}}</span></div>
                      <div class="intention"><span>中意向</span><span class="publicCycleColor">{{rUsersDealData.center}}</span></div>
                      <div class="intention"><span>低意向</span><span class="publicCycleColor">{{rUsersDealData.low}}</span></div>
                    </div>
                </div>
              </div>
              <div class="deal box-bg-border">
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                  <div class="f-friend">
                      <div class="publicDealStyle">
                         <div class="publictextStyle">F-Friend体验服务成交</div>
                         <div><span class="blue">{{friendDealData.value}}</span>万</div>
                          <div class="dealTb">

                            <div class="publicMarginRight">同比</div>

                            <div class="green">
                               <span class="iconfont iconshangsheng"></span>
                               <span class="publicMarginLeft">{{friendDealData.tb}}</span>
                            </div>

                            <div class="dealtims">
                               <span class="publicPaddingright">进度目标值</span>
                               <span>{{friendDealData.aims}}万</span>
                            </div>

                        </div>

                        <div class="dealTb">
                            <div class="publicMarginRight">环比</div>

                            <div class="red">
                              <span class="iconfont iconxiajiang"></span>
                              <span class="publicMarginLeft">{{friendDealData.hb}}</span>
                            </div>

                            <div class="dealtims">
                              <span class="publicPaddingright">完成率</span>
                              <span class="red">{{friendDealData.finished}}</span>
                           </div>
                            </div>

                          <div class="average">
                            <span>平均转化周期</span>
                            <span class="tian">{{friendDealData.average}}</span>
                         </div>
                      </div>
                  </div>

                  <div class="offlineExperience">

                      <div class="publicDealStyle">
                         <div class="publictextStyle">线下体验中心到店成交</div>
                         <div><span class="blue">{{rtoShopData.value}}</span>万</div>
                          <div class="dealTb">

                            <div class="publicMarginRight">同比</div>

                            <div class="green">
                               <span class="iconfont iconshangsheng"></span>
                               <span class="publicMarginLeft">{{rtoShopData.tb}}</span>
                            </div>

                            <div class="dealtims">
                               <span class="publicPaddingright">进度目标值</span>
                               <span>{{rtoShopData.aims}}</span>
                            </div>

                        </div>

                        <div class="dealTb">
                            <div class="publicMarginRight">环比</div>

                            <div class="green">
                              <span class="iconfont iconshangsheng"></span>
                              <span class="publicMarginLeft">{{rtoShopData.hb}}</span>
                            </div>

                            <div class="dealtims">
                              <span class="publicPaddingright">完成率</span>
                              <span class="red">{{rtoShopData.finished}}</span>
                           </div>
                            </div>

                          <div class="average">
                            <span>平均转化周期</span>
                            <span class="tian">{{rtoShopData.average}}</span>
                         </div>
                      </div>
                  </div>
              </div>
            </div>

          </div>

          <!-- 荣威 -->
          <div class="specificDistributionRoewe" v-show="showRoewe">
              <div class="rwContent box-bg-border">
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                <div class="defeatpoolData">
                    <!-- <div class="defeatPool"> -->
                      <div class="publicDealStyle">
                        <div class="publictextStyle">
                          战败池
                          <div class="sum"><span class="blue">{{defeatData.value ? defeatData.value : '——'}}</span>{{defeatData.unit}}</div>
                        </div>
                        <div class="dealTb">
                          <div class="publicMarginRight">同比</div>

                          <div v-if="defeatData.tb" class="tbhb-width">
                              <span class="iconfont iconxiajiang" v-if="(defeatData.tb).startsWith('-')"></span>
                              <span class="iconfont iconshangsheng" v-else></span>
                              <span class="publicMarginLeft">{{defeatData.tb | negative}}</span>
                          </div>
                          <div class="tbhb-width" v-else>—</div>

                          <!-- <div class="dealtims">
                              <span class="publicPaddingright">目标值</span>
                              <span class="tbhb-width">{{defeatData.aims ? defeatData.aims : '—'}}</span>
                          </div> -->

                        </div>

                        <div class="dealTb">
                          <div class="publicMarginRight">环比</div>

                          <div v-if="defeatData.hb" class="tbhb-width" >
                              <span class="iconfont iconxiajiang" v-if="(defeatData.hb).startsWith('-')"></span>
                              <span class="iconfont iconshangsheng" v-else></span>
                              <span class="publicMarginLeft">{{defeatData.hb | negative}}</span>
                          </div>
                          <div class="tbhb-width" v-else>—</div>

                          <!-- <div class="dealtims">
                            <span class="publicPaddingright">完成率</span>
                            <span class="tbhb-width" :class="defeatData.finished ? 'green' : ''">{{defeatData.finished ? defeatData.finished : '—'}}</span>
                          </div> -->
                        </div>

                    </div>
                    <!-- <div class="defeatpoolEchart" ref="defeatpoolEchart"></div> -->
                    <!-- <div class="defeatpoolIcon"></div> -->
                </div>

              </div>
              <div class="rwContent box-bg-border paddingleft-446">
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                <div class="defeatarrow arrowPublic" @click="changeDefeated">战败</div>
                <div class="toShop">
                      <div class="publicDealStyle">
                          <div class="publictextStyle">
                            到店
                            <div class="sum"><span class="blue">{{rwtoShopData.value ? rwtoShopData.value : '——'}}</span>{{rwtoShopData.unit}}</div>
                          </div>
                         
                          <div class="dealTb">

                            <div class="publicMarginRight">同比</div>

                            <div v-if="rwtoShopData.tb"  class="tbhb-width" :class="(rwtoShopData.tb).startsWith('-') ? 'red' : 'green'">
                               <span class="iconfont iconxiajiang" v-if="(rwtoShopData.tb).startsWith('-')"></span>
                               <span class="iconfont iconshangsheng" v-else></span>
                               <span class="publicMarginLeft">{{rwtoShopData.tb | negative}}</span>
                            </div>
                            <div class="tbhb-width" v-else>—</div>

                            <div class="dealtims">
                               <span class="publicPaddingright enlarge">进度目标值</span>
                               <span class="tbhb-width enlarge">{{rwtoShopData.aims? rwtoShopData.aims : '—'}}</span>
                            </div>
                            
                            <!-- <div class="average">
                              <span>线上平均转化周期</span>
                              <span class="tian" v-if="rwtoShopData.average">{{rwtoShopData.average}}天</span>
                              <span class="tian white" v-else>—</span>
                            </div> -->
                          </div>

                          <div class="dealTb">
                              <div class="publicMarginRight">环比</div>

                            <div v-if="rwtoShopData.hb" class="tbhb-width" :class="(rwtoShopData.hb).startsWith('-') ? 'red' : 'green'">
                               <span class="iconfont iconxiajiang" v-if="(rwtoShopData.hb).startsWith('-')"></span>
                               <span class="iconfont iconshangsheng" v-else></span>
                               <span class="publicMarginLeft">{{rwtoShopData.hb | negative}}</span>
                            </div>
                            <div class="tbhb-width" v-else>—</div>

                              <div class="dealtims">
                                <span class="publicPaddingright enlarge">完成率</span>
                                <span class="tbhb-width enlarge">{{rwtoShopData.finished ? rwtoShopData.finished : '—'}}</span>
                              </div>

                              <!-- <div class="average">
                                <span>线下平均转化周期</span>
                                <span class="tian" v-if="rwtoShopData.offlineAverage">{{rwtoShopData.offlineAverage}}天</span>
                                <span class="tian white" v-else>—</span>
                              </div> -->
                            </div>
                      </div>
                </div>

                <!-- <div class="toShopRight">
                      <div class="publicDealStyle">
                         <div class="publictextStyle">到店-线下</div>
                         <div><span class="blue">18004</span></div>
                          <div class="dealTb">

                            <div class="publicMarginRight">同比</div>

                            <div class="red">
                               <span class="iconfont iconxiajiang"></span>
                               <span class="publicMarginLeft">19.93%</span>
                            </div>

                            <div class="dealtims">
                               <span class="publicPaddingright">目标值</span>
                               <span>243338</span>
                            </div>

                          </div>

                          <div class="dealTb">
                              <div class="publicMarginRight">环比</div>

                            <div class="green">
                              <span class="iconfont iconshangsheng"></span>
                              <span class="publicMarginLeft">27.40%</span>
                            </div>

                            <div class="dealtims">
                              <span class="publicPaddingright">完成率</span>
                              <span class="green">90.91%</span>
                           </div>
                            </div>

                          <div class="average">
                            <span>平均转化周期</span>
                            <span class="tian">16.78 天</span>
                         </div>
                      </div>
                </div> -->
              </div>
              <div class="rwContent box-bg-border"
                  :class="brandName === '名爵' ? 'paddingleft-340' : ''"
              >
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                <div class="allDeal">
                  <!-- <div class="publictextStyle">总成交用户数-线上</div>
                  <div class="blue">5449</div>
                  <div class="alldealValue">
                    <Ratio />
                    <div class="alldealCycle">
                      <div class="alldealpublc">平均转化周期</div>
                      <div class="alldealpublc">
                        <span class="publicMarginRight">高意向</span>
                        <span class="rwalldealColor">{{usersOnlineData.high}}</span>  
                      </div>
                      <div class="alldealpublc">
                        <span class="publicMarginRight">中意向</span>
                        <span  class="rwalldealColor">{{usersOnlineData.center}}</span>
                      </div>
                      <div class="alldealpublc">
                        <span class="publicMarginRight">低意向</span>
                        <span  class="rwalldealColor">{{usersOnlineData.low}}</span>
                      </div>
                    </div>
                  </div> -->
                    <div class="publicDealStyle">
                      <el-button  v-if="brandName === '名爵'" type="primary" class="market-shares" @click="marketJump">市占率分析<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                          <div class="publictextStyle">
                            总成交量
                            <div class="sum"><span class="blue">{{allDealData.value ? allDealData.value : '——'}}</span>{{allDealData.unit}}</div>
                          </div>
                         
                          <div class="dealTb">

                            <div class="publicMarginRight">同比</div>

                            <div v-if="allDealData.tb"  class="tbhb-width" :class="(allDealData.tb).startsWith('-') ? 'red' : 'green'">
                               <span class="iconfont iconxiajiang" v-if="(allDealData.tb).startsWith('-')"></span>
                               <span class="iconfont iconshangsheng" v-else></span>
                               <span class="publicMarginLeft">{{allDealData.tb | negative}}</span>
                            </div>
                            <div class="tbhb-width" v-else>—</div>

                            <div class="dealtims">
                               <span class="publicPaddingright enlarge">进度目标值</span>
                               <span class="tbhb-width enlarge">{{allDealData.aims ? allDealData.aims : '—'}}</span>
                            </div>

                            <div class="average "style="margin-left:0;">
                              <span>线上平均转化周期</span>
                              <span class="tian" v-if="allDealData.average">{{allDealData.average}}天</span>
                              <span class="tian white" v-else>—</span>
                            </div>

                          </div>

                          <div class="dealTb">
                            <div class="publicMarginRight">环比</div>

                            <div v-if="allDealData.hb"  class="tbhb-width" :class="(allDealData.hb).startsWith('-') ? 'red' : 'green'">
                               <span class="iconfont iconxiajiang" v-if="(allDealData.hb).startsWith('-')"></span>
                               <span class="iconfont iconshangsheng" v-else></span>
                               <span class="publicMarginLeft">{{allDealData.hb | negative}}</span>
                            </div>
                            <div class="tbhb-width" v-else>—</div>

                            <div class="dealtims">
                              <span class="publicPaddingright enlarge">完成率</span>
                              <span class="tbhb-width enlarge">{{allDealData.finished ? allDealData.finished : '—'}}</span>
                            </div>

                            <div class="average" style="margin-left: 58px;">
                              <span>线下平均转化周期</span>
                              <span class="tian" v-if="allDealData.offlineAverage">{{allDealData.offlineAverage}}天</span>
                              <span class="tian white"  v-else>—</span>
                            </div>
                          </div>

                         
                    </div>
                </div>

                <!-- <div class="allDealright">
                 <div class="publictextStyle">总成交用户数-线下</div>
                   <div class="blue">5449</div>
                   <div class="alldealValue">
                    <Ratio />
                    <div class="alldealCycle">
                      <div class="alldealpublc">平均转化周期</div>
                      <div class="alldealpublc">
                        <span class="publicMarginRight">高意向</span>
                        <span class="rwalldealColor">12.05天</span>  
                      </div>
                      <div class="alldealpublc">
                        <span class="publicMarginRight">中意向</span>
                        <span  class="rwalldealColor">16.04天</span>
                      </div>
                      <div class="alldealpublc">
                        <span class="publicMarginRight">低意向</span>
                        <span  class="rwalldealColor">25.30天</span>
                      </div>
                    </div>
                  </div>
                </div> -->
              </div>
              <div class="rwContent box-bg-border paddingleft-446">
                <span class="border border-top-left"></span>
                <span class="border border-top-right"></span>
                <span class="border border-bottom-left"></span>
                <span class="border border-bottom-right"></span>
                <div class="card">
                      <div class="publicDealStyle">
                        <div class="publictextStyle">
                          订单
                          <div class="sum"><span class="blue">{{cardData.value ? cardData.value : '——'}}</span>{{cardData.unit}}</div>
                        </div>
                         
                          <div class="dealTb">

                            <div class="publicMarginRight">同比</div>

                            <div v-if="cardData.tb" class="tbhb-width" :class="(cardData.tb).startsWith('-') ? 'red' : 'green'" >
                              <!-- <span class="iconfont iconxiajiang" v-if="(cardData.tb).startWith('-')"></span> -->
                               <span class="iconfont iconxiajiang" v-if="(cardData.tb).startsWith('-')"></span>
                               <span class="iconfont iconshangsheng" v-else></span>
                               <span class="publicMarginLeft">{{cardData.tb | negative}}</span>
                            </div> 
                            <div class="tbhb-width" v-else>—</div>

                            <div class="dealtims">
                               <span class="publicPaddingright enlarge">进度目标值</span>
                               <span class="tbhb-width enlarge">{{cardData.aims? cardData.aims : '—' }}</span>
                            </div>

                          <!-- <div class="average">
                            <span>线上建卡平均转化周期</span>
                            <span class="tian" v-if="cardData.average">{{cardData.average}}天</span>
                            <span class="tian white" v-else>—</span>
                          </div> -->
                        </div>

                        <div class="dealTb">
                            <div class="publicMarginRight">环比</div>

                            <div v-if="cardData.hb" class="tbhb-width" :class="(cardData.hb).startsWith('-') ? 'red' : 'green'">
                               <span class="iconfont iconxiajiang" v-if="(cardData.hb).startsWith('-')"></span>
                               <span class="iconfont iconshangsheng" v-else></span>
                               <span class="publicMarginLeft">{{cardData.hb | negative}}</span>
                            </div>
                            <div class="tbhb-width" v-else>—</div>

                            <div class="dealtims">
                              <span class="publicPaddingright enlarge">完成率</span>
                              <span class="tbhb-width enlarge">{{cardData.finished ? cardData.finished : '—'}}</span>
                           </div>
                            </div>
                      </div>
                </div>
              </div>
          </div>
          <!-- 箭头 -->
            <div class="diversion arrowPublic">导流</div>
            <div class="sem arrowPublic">
              <p>投放</p>
              <p>SEM</p>
            </div>
            <!-- <div class="drop arrowPublic">投放</div> -->
            <!-- <div class="registered arrowPublic">注册</div> -->
            <div class="keep arrowPublic">留资</div>
            <!-- <div class="keep1 arrowPublic">留资</div> -->
            <!-- <div class="keep2 arrowPublic">留资</div> -->
            <!-- <div class="keep3 arrowPublic">留资</div> -->
            <!-- <div class="defeated arrowPublic" @click="changeDefeatedModal = true">
              <p>低意向及</p>
              <p>战败客户</p>
            </div> -->
            <!-- <div class="nurtureArrow arrowPublic" :class="{'nurtureLeft' :nurtureArrow}">培育</div> -->
            <div class="notR arrowPublic" v-show="showNotr">
              <p>非R网</p>
              <p>地区</p>
            </div>
            <div class="Raera arrowPublic" v-show="showRaera">
              <p>R网</p>
              <p>地区</p>
            </div>
            <div class="transform1 arrowPublic" v-show="showTransform1">转化</div>
            <div class="transform2 arrowPublic" v-show="showTransform2">转化</div>

            <!-- 荣威箭头 -->
            <div class="rwarrow arrowPublic" v-show="showRwarrow">转化</div>
            <div class="rwTransform arrowPublic" v-show="showrwTransform">转化</div>
            <div class="rwTransform1 arrowPublic" v-show="showrwTransform1">成交</div>
        </div>

      </div>

    </div>

      <!-- 战败模态框 -->
      <el-dialog 
        title="战败原因分析" 
        :visible.sync="changeDefeatedModal"
        @open="open"
        @close ="closeDefeat"
        width="1220px"
        :modal-append-to-body='false'
      >
        <div class="defeatedEcharts">
          <div class="echartsTitle">各战败原因数量</div>
          <div class="defeatedContent">
            <div v-if="changeDefeatedModal" ref="defeatedEchart" class="defeatedContentEcharts">

            </div>
            <ul class="defeat-num-list">
              <li v-for="(item, index) in defeatedEchartsNumRev" :key="index">
                {{ item }}
              </li>
            </ul>
          </div>

          <div class="defeatedTotal">
            <span>合计：</span>
            <span>{{defeatedEchartsNumSumtotal.value}}{{defeatedEchartsNumSumtotal.unit}}</span>
          </div>
      </div>
      </el-dialog>

      <!-- 培育池模态框 -->
            <el-dialog 
        title="培育池用户详情" 
        :visible.sync="changeNurtureModal"
        @open="nurtureOpen"
        width="3084px"
        :modal-append-to-body='false'
           >
           <div class="ntmodalContent">
             <div class="ntmodalDistributed">
                <div class="cycle">
                    <div class="cycleTitle">
                      培育用户群滞留周期
                    </div>
                    <div class="ntmodalEcharts" ref="ntmodalEcharts"></div>
                </div>
                <div class="distributed">
                  <div class="distributedTitle">培育用户意向分布</div>
                  <div class="distributedEcharts"></div>
                </div>
             </div>

             <div class=ntmodalPortrait></div>
           </div>
           </el-dialog>
  </div>


</template>

<script lang="ts">
import { Component, Vue, Prop, Watch, InjectReactive } from 'vue-property-decorator';
import { SideNav, Ratio, TopBar } from '@/components/index';
import { calculation , numberFormat, finishingRate } from '@/utils/utils.ts';
import moment from 'moment';
import _ from 'lodash';

interface TIMERANGE {
  key: string;
  type: string;
  // n: number;
}

@Component({
  components: {
    TopBar,
    SideNav,
    Ratio
  },
  filters: {
    negative: (value: any) => {
      if (value.startsWith('-')) {

      return value.split('-')[1];
      } else {
        return value;
      }
      
    }
  }
})


export default class DashBoard extends Vue {


  @Prop({
    required: false,
    default: ''
  }) brandName!: string;

  @Prop({
    required: false,
    default: 101
  }) brandId!: number;

  @Prop({
    required: false,
    default: () => []
  }) checkedArea!: string[];

  @Prop({
    required: false,
    default: () => []
  }) series!: any[];
  
  
  @Prop({
    required: false,
    default: {}
  }) filterData: any;

  @Prop({
    required: false,
    default: {}
  }) time!: TIMERANGE;

  showR = false;
  showRoewe = true;

  //控制nurtureArrow的left值
  nurtureArrow = true;
  //r标箭头

  showNotr = false;
  showRaera = false; 
  showTransform1 = false;
  showTransform2 = false; 

  //荣威箭头
  showRwarrow = true;
  showrwTransform = true;
  showrwTransform1 = true;
  //战败模态框显示
  changeDefeatedModal = false;
  //培育池模态框显示
  changeNurtureModal = false;

  socializeValue: number = 128.49; 

  //当前年份
  currentYear = Number( moment().format( 'YYYY' ));

  //当前周
  currentWeek = moment().week();

  //当前日
  currentWeekDay = moment().weekday();
  //传播数据
  propagationData: any = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: ''
  };

  //线索分配数据
  clueAllocationData = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: ''
  };

  //R标非r网地区数据
  rFriendData = {
    value: 29.51,
    tb: '2.27%',
    hb: '1.92%',
    aims: '35.00',
    finished: '88.04%',
    average: '16.78天'
  };

  //R标r网地区
  offlineData = {
    value: 19.68,
    tb: '10.04%',
    hb: '6.03%',
    aims: '25.70',
    finished: '88.04%',
    average: '20.33天'
  };

  //R标体验服务成交数据
  friendDealData = {
    value: '15.40',
    tb: '2.00%',
    hb: '5.02%',
    aims: '25.00',
    finished: '100.92%',
    average: '15.37天'
  };
  
  //R标到店成交数据
  rtoShopData = {
    value: '10.89',
    tb: '0,09%',
    hb: '6.04%',
    aims: '12.05万',
    finished: '92.04%',
    average: '16.78天'
  };

  //R标总成交用户数据
  rUsersDealData =  {
    high : '12.05天',
    low : '16.04天',
    center : '25.30天'
  };

  //荣威建卡数据
  cardData: any = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: ''
  };

//荣威总成交用户数ui显示数据
allDealData: any = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: '',
    average: '',
    offlineAverage: ''
};
  //第一方触点ui显示数据
  contactRatiodata = {
  value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
  // proportion: ''
  };
  //垂媒ui数据
  verticalRatiodata = {
  value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
  };
  //外拓获客ui数据
  outreachRatiodata = {
  value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
  };

  //自然获客ui数据
  naturalRatiodata = {
  value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
  };

  //电商ui数据
  shopkeeperRatiodata = {
  value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
};

//战败池ui显示数据
defeatData = {
  value: '' ,
  unit: '',
  tb: '',
  hb: ''
  // aims: '',
  // finished: ''
};

//社交化裂变数据
socialData = {
    value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
};

//获客云数据
huokeyunData = {
      value: '' ,
  unit: '',
  tb: '',
  hb: '',
  aims: '',
  finished: ''
};
defeatedEchartsText: any[] = [];
defeatedEchartsNum: any[] = [];
defeatedEchartsNumSum: number = 0;
defeatedEchartsNumSumtotal = {
  value: '',
  unit: ''
};
defeatedEchartsNumRev: any[] = [];
  //荣威线上成交用户数据
  // usersOnlineData = {
  //   high: '12.05天',
  //   center: '16.04天',
  //   low: '25.30天'
  // };

 //荣威线下成交用户数据
//  usersOfflineData = {
//     high: '12.05天',
//     center: '16.04天',
//     low: '25.30天'
//  };

//荣威到店数据
rwtoShopData: any = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: ''
};

//ratio组件数据
publicRatioData = {
  value: 16 ,
  unit: '万',
  tb: '5.28%',
  hb: '6.04%',
  aims: '20.05',
  finished: '92.02%',
  proportion: '95.45%'
};

  restEchartsData = {
    hLevel: 0,
    oLevel: 0,
    aLevel: 0,
    bLevel: 0,
    nLevel: 0,
    cLevel: 0
  };
  contactLevel: any = {
    hLevel: 0,
    oLevel: 0,
    aLevel: 0,
    bLevel: 0,
    nLevel: 0,
    cLevel: 0
  };
  verticalMediaLevel: any = {
    hLevel: 0,
    oLevel: 0,
    aLevel: 0,
    bLevel: 0,
    nLevel: 0,
    cLevel: 0
  };
  outreachDataLevel: any = {
    hLevel: 0,
    oLevel: 0,
    aLevel: 0,
    bLevel: 0,
    nLevel: 0,
    cLevel: 0
  };
  naturalLevel: any = {
    hLevel: 0,
    oLevel: 0,
    aLevel: 0,
    bLevel: 0,
    nLevel: 0,
    cLevel: 0
  };
  targetValue: any = {
    contactAim: 0,
    verticalMedia: 0,
    natural: 0,
    outreach: 0
  };
 

  @Watch('filterData')
  onFilterDatachange() {
    console.log(this.filterData, 'this.filterData');
    this.onRuleChange();
  }


  // @Watch('brandName')
  // brandNameChange() {    
  //   this.onRuleChange();
  // }
  // @Watch('time.key')
  // brandTimeKeyChange() {
  //     this.onTimeKeyChange();
  // }

  // @Watch('checkedArea')
  // checkAreaChange() {
  //   this.onAreaChange();
  // }

  // @Watch('series')
  // seriesChange() {
  //   console.log('onSeriesChange');
  //   this.onSeriesChange();
  // }

  onRuleChange() {
    this.defeatedEchartsText = [];
    this.defeatedEchartsNum = [];
    this.defeatedEchartsNumSum = 0;
    this.defeatedEchartsNumSumtotal = {
      value: '',
      unit: ''
    };
    this.defeatedEchartsNumRev = [];
    this.getContactData();
    this.getAlldealData();
    this.getDefeatdata();
    this.getConverforsalesData();
    this.getspreadData();
    this.getToshopData();
    this.getdefeatedEcharts();
    //echarts
    this.getOpporEchartsData().then((data: any) => {
      this.buildOpperLevel(data.now);
      this.contactEchart();
      this.verticalMediaEchart();
      this.outreachEchart();
      this.naturalEchart();
    });
    if ( this.brandName === 'R标' ) {
      this.rMark();
    } else {
      this.roewe();
    }
    // this.dianshangEchart();
    // this.huokeyunEchart();
    // this.defeatpoolEchart();
    
  }

  created() {
    this.onRuleChange();
  }

  mounted() {
    this.getOpporEchartsData().then((data: any) => {
      this.buildOpperLevel(data.now);
      this.contactEchart();
      this.verticalMediaEchart();
      this.outreachEchart();
      this.naturalEchart();
      this.nurtureEchart();
    });
    // this.defeatpoolEchart();
  }

  getOpporEchartsData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      sourceType: true,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString(),
      levelName: true
    };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
    }
    // console.log(params, 'getOpporEchartsData');
    return new Promise((res, rej) => {
      $api.DashboardApi.opporOrder(params).then((data) => {
        res(data);
      }).catch(() => {
        rej([]);
      });
    });
  }

  buildOpperLevel(data: any[]) {
    let contactLevel: any = {
      hLevel: 0,
      oLevel: 0,
      aLevel: 0,
      bLevel: 0,
      nLevel: 0,
      cLevel: 0
    };
    let verticalMediaLevel: any = {
      hLevel: 0,
      oLevel: 0,
      aLevel: 0,
      bLevel: 0,
      nLevel: 0,
      cLevel: 0
    };
    let outreachDataLevel: any = {
      hLevel: 0,
      oLevel: 0,
      aLevel: 0,
      bLevel: 0,
      nLevel: 0,
      cLevel: 0
    };
    let naturalLevel: any = {
      hLevel: 0,
      oLevel: 0,
      aLevel: 0,
      bLevel: 0,
      nLevel: 0,
      cLevel: 0
    };
    data.forEach(level => {
      if (level.sourceType === '第一方触点') {
        switch (level.opporLevelName) {
          case 'O':
            contactLevel.oLevel = level.opporNum;
            break;
          case 'H':
            contactLevel.hLevel = level.opporNum;
            break;
          case 'A':
            contactLevel.aLevel = level.opporNum;
            break;
          case 'B':
            contactLevel.bLevel = level.opporNum;
            break;
          case 'N':
            contactLevel.nLevel = level.opporNum;
            break;
          case 'C':
            contactLevel.cLevel = level.opporNum;
            break;        
          default:
            break;
        }
      }
      if (level.sourceType === '垂媒') {
        switch (level.opporLevelName) {
          case 'O':
            verticalMediaLevel.oLevel = level.opporNum;
            break;
          case 'H':
            verticalMediaLevel.hLevel = level.opporNum;
            break;
          case 'A':
            verticalMediaLevel.aLevel = level.opporNum;
            break;
          case 'B':
            verticalMediaLevel.bLevel = level.opporNum;
            break;
          case 'N':
            verticalMediaLevel.nLevel = level.opporNum;
            break;        
          case 'C':
            verticalMediaLevel.cLevel = level.opporNum;
            break;  
          default:
            break;
        }
      }
      if (level.sourceType === '外拓客户') {
        switch (level.opporLevelName) {
          case 'O':
            outreachDataLevel.oLevel = level.opporNum;
            break;
          case 'H':
            outreachDataLevel.hLevel = level.opporNum;
            break;
          case 'A':
            outreachDataLevel.aLevel = level.opporNum;
            break;
          case 'B':
            outreachDataLevel.bLevel = level.opporNum;
            break;
          case 'N':
            outreachDataLevel.nLevel = level.opporNum;
            break;      
          case 'C':
            outreachDataLevel.cLevel = level.opporNum;
            break;    
          default:
            break;
        }
      }
      if (level.sourceType === '自然获客') {
        switch (level.opporLevelName) {
          case 'O':
            naturalLevel.oLevel = level.opporNum;
            break;
          case 'H':
            naturalLevel.hLevel = level.opporNum;
            break;
          case 'A':
            naturalLevel.aLevel = level.opporNum;
            break;
          case 'B':
            naturalLevel.bLevel = level.opporNum;
            break;
          case 'N':
            naturalLevel.nLevel = level.opporNum;
            break;  
          case 'C':
            naturalLevel.cLevel = level.opporNum;
            break;      
          default:
            break;
        }
      }
    });
    this.contactLevel = contactLevel;
    this.verticalMediaLevel = verticalMediaLevel;
    this.outreachDataLevel = outreachDataLevel;
    this.naturalLevel = naturalLevel;
  }

//战败模态框的open事件
  open() {
    this.$nextTick(() => {
      this.defeatedEchart();
    });
  }

//培育池模态框open事件
nurtureOpen() {
   this.getNtmodalEchart();
}

//渠道api数据

 async getContactData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      sourceType: true,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString()
    };

      let aimsList = {
     type: '意向',
     timeType: this.time.key,
     brandId: this.brandId,
     rfsCodes: this.checkedArea.toString(),
     seriesIds: this.series.toString(),
     bizModuleName: true
   };
        if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
      delete aimsList.rfsCodes;
    }
  let carName: any[] = [];
  let seriesName: any[] = [];
  $commonData.seriesData.getSeriesMap().forEach((item: any) => {
      if (Number(this.brandId) === item.brandId) {
        carName.push(item);
      }
  });
  carName[0].children.forEach((info: any) => {
      this.series.forEach((item: any) => {
        if (item === info.seriesId) {
            seriesName.push(info.seriesChineseName);
        }
      });
  });

  // console.log(seriesName , 'hahahah');
  aimsList.seriesIds = seriesName.toString();
    this.targetValue = {
    contactAim: 0,
    verticalMedia: 0,
    natural: 0,
    outreach: 0
  };

    const data = await $api.DashboardApi.aimsData(aimsList);
    console.log(data , '意向目标');
    let allAims: any = 0;
    let intentionAims: any = {
      contactAim: '',
      verticalMedia: '',
      outreach: '',
      natural: ''
    };
    if (data.now.length === 0) {
      allAims = '';
      intentionAims.outreach = '';
      intentionAims.contactAim = '';
      intentionAims.verticalMedia = '';
      intentionAims.natural = '';
    } else {
    data.now.forEach((item: any) => {
      if (item.bizModuleName === '展厅主动开拓') {
        // intentionAims.outreach = (Number(item.kpi)).toFixed(2);
            intentionAims.outreach = Math.round(Number(item.kpi));
        this.targetValue.outreach = intentionAims.outreach;

        allAims += Number(item.kpi);
      }
      if (item.bizModuleName === '展厅自然客流') {
        intentionAims.natural = Math.round(Number(item.kpi));
        this.targetValue.natural = intentionAims.natural;
        allAims += Number(item.kpi);

      } 
      if (item.bizModuleName === '厂方分配') {
        intentionAims.contactAim = Math.round(Number(item.kpi));
        this.targetValue.contactAim = intentionAims.contactAim;
        allAims += Number(item.kpi);

      } 
      if (item.bizModuleName === '电网销') {
        intentionAims.verticalMedia = Math.round(Number(item.kpi));
        this.targetValue.verticalMedia = intentionAims.verticalMedia;
        allAims += Number(item.kpi);

      }
    });
    // allAims = allAims.toFixed(2);
    allAims = Math.round(allAims);
    }

    console.log(intentionAims , allAims , 2222);


    $api.DashboardApi.getopporOrderData(params).then( (res: any) => {
      console.log(res , '渠道');
      //第一方触点数据
      let nowcontactData: any = {
        year: [],
        last: [],
        now: []
      };
      //垂媒数据
      let nowverticalMediaData: any = {
        year: [],
        last: [],
        now: []
      };
      //外拓数据
      let nowoutreachData: any = {
        year: [],
        last: [],
        now: []
      };
    //自然数据
      let nownaturalData: any = {
        year: [],
        last: [],
        now: []
      };
    //  电商数据
      // let nowdianshangData: any = {
      //   year: [],
      //   last: [],
      //   now: []
      // };
        let allNowsopporNum = 0;
        let allYearopporNum = 0;
        let allLastopporNum = 0;
        let allNowsDistinctopporNums = 0;
        res.last.forEach((item: any) => {
              if (item.sourceType === '第一方触点') {
                allLastopporNum += item.opporNum;
                nowcontactData.last.push(item);
              } else if (item.sourceType === '垂媒') {
                allLastopporNum += item.opporNum;
                nowverticalMediaData.last.push(item);
              } else if (item.sourceType === '外拓客户') {
                allLastopporNum += item.opporNum;
                nowoutreachData.last.push(item);
              } else if (item.sourceType === '自然获客') {
                allLastopporNum += item.opporNum;
                nownaturalData.last.push(item);
              } 
              // else if (item.sourceType === '电商') {
              //   nowdianshangData.last.push(item);
              // }
        });

        res.now.forEach((item: any) => {
              if (item.sourceType === '第一方触点') {
                  allNowsopporNum += item.opporNum;
                  nowcontactData.now.push(item);
              } else if (item.sourceType === '垂媒') {
                allNowsopporNum += item.opporNum;
                nowverticalMediaData.now.push(item);
              } else if (item.sourceType === '外拓客户') {
                allNowsopporNum += item.opporNum;
                nowoutreachData.now.push(item);
              } else if (item.sourceType === '自然获客') {
               allNowsopporNum += item.opporNum;
                nownaturalData.now.push(item);
              } 
              // else if (item.sourceType === '电商') {
              //   nowdianshangData.now.push(item);
              // }
        });

        res.lsatYear.forEach((item: any) => {
              if (item.sourceType === '第一方触点') {
                  allYearopporNum += item.opporNum;
                  nowcontactData.year.push(item);
              } else if (item.sourceType === '垂媒') {
                allYearopporNum += item.opporNum;
                nowverticalMediaData.year.push(item);
              } else if (item.sourceType === '外拓客户') {
                allYearopporNum += item.opporNum;
                nowoutreachData.year.push(item);
              } else if (item.sourceType === '自然获客') {
                allYearopporNum += item.opporNum;
                nownaturalData.year.push(item);
              } 
              // else if (item.sourceType === '电商') {
              //   nowdianshangData.year.push(item);
              // }
        });
        // console.log(allNowsopporNum , allYearopporNum , allLastopporNum);

        // console.log( nowcontactData ,nowverticalMediaData, nowoutreachData, nownaturalData,nowdianshangData);
        if (this.time.key === 'all') {
          this.contactRatiodata = this.allOperationData(nowcontactData.now , intentionAims.contactAim);
          this.verticalRatiodata = this.allOperationData(nowverticalMediaData.now , intentionAims.verticalMedia);
          this.outreachRatiodata = this.allOperationData(nowoutreachData.now , intentionAims.outreach);
          this.naturalRatiodata  = this.allOperationData(nownaturalData.now , intentionAims.natural );
          // this.shopkeeperRatiodata = this.allOperationData(nowdianshangData.now);
          this.clueAllocationData = this.allSumData(allNowsopporNum , allAims);
        } else {
          this.contactRatiodata = this.operationData(nowcontactData.now , nowcontactData.year , nowcontactData.last , intentionAims.contactAim);
          this.verticalRatiodata = this.operationData(nowverticalMediaData.now , nowverticalMediaData.year , nowverticalMediaData.last , intentionAims.verticalMedia);
          this.outreachRatiodata = this.operationData(nowoutreachData.now , nowoutreachData.year , nowoutreachData.last , intentionAims.outreach);
          this.naturalRatiodata = this.operationData(nownaturalData.now , nownaturalData.year , nownaturalData.last , intentionAims.natural );
          // this.shopkeeperRatiodata = this.operationData(nowdianshangData.now , nowdianshangData.year , nowdianshangData.last);
          this.clueAllocationData = this.sumData(allNowsopporNum , allYearopporNum , allLastopporNum , allAims);
        }

    })
    .catch(e => {
      // console.log(e);
      this.contactRatiodata = this.resetData();
      this.verticalRatiodata = this.resetData();
      this.outreachRatiodata = this.resetData();
      this.naturalRatiodata = this.resetData();
      this.shopkeeperRatiodata = this.resetData();

    });
  }

// 战败api数据
getDefeatdata() {
  let params = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString()
  };
  if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
     delete params.rfsCodes;
    }
  $api.DashboardApi.defeatData(params).then( (res) => {
      // console.log(res , '战败');
      let olddefeatData = res.lsatYear[0];
      let nowdefeatData = res.now[0];
      let lastdefeatData = res.last[0];
      // console.log(olddefeatData);
      if (!nowdefeatData) {
        this.defeatData = {
               value: '' ,
               unit: '',
               tb: '',
               hb: '',
              //  aims: '',
              //  finished: ''
           };

           return;
      }

  if (this.time.key === 'year' ) {
      if (!lastdefeatData ) {
        let defeatTb = '';
        let defeatHb = '';
        let defeatParams = numberFormat(nowdefeatData.defeat);
        this.defeatData = {
               value: defeatParams.value ,
               unit: defeatParams.unit,
               tb: defeatTb,
               hb: defeatHb
              //  aims: '',
              //  finished: ''
           };
      } else {
        let defeatTb = calculation(nowdefeatData.defeat , lastdefeatData.defeat );
        let defeatHb = calculation(nowdefeatData.defeat , lastdefeatData.defeat );
        let defeatParams = numberFormat(nowdefeatData.defeat);
        this.defeatData = {
               value: defeatParams.value ,
               unit: defeatParams.unit,
               tb: defeatTb,
               hb: defeatHb
              //  aims: '',
              //  finished: ''
           };
      }

  }

  if (this.time.key === 'month' || this.time.key === 'threemonth' || this.time.key === 'week' || this.time.key === 'day' ||  this.time.key === 'last_month') {
      if (!olddefeatData) {
        let defeatTb = '';
        let defeatHb = calculation(nowdefeatData.defeat , lastdefeatData.defeat);
        let defeatParams = numberFormat(nowdefeatData.defeat);
        this.defeatData = {
               value: defeatParams.value ,
               unit: defeatParams.unit,
               tb: defeatTb,
               hb: defeatHb
              //  aims: '',
              //  finished: ''
           };
      } else if (!lastdefeatData) {
        let defeatTb = calculation(nowdefeatData.defeat , olddefeatData.defeat);
        let defeatHb = '';
        let defeatParams = numberFormat(nowdefeatData.defeat);
        this.defeatData = {
               value: defeatParams.value ,
               unit: defeatParams.unit,
               tb: defeatTb,
               hb: defeatHb
              //  aims: '',
              //  finished: ''
           };
      } else {
        let defeatTb = calculation(nowdefeatData.defeat , olddefeatData.defeat);
        let defeatHb = calculation(nowdefeatData.defeat , lastdefeatData.defeat);
        let defeatParams = numberFormat(nowdefeatData.defeat);
        this.defeatData = {
               value: defeatParams.value ,
               unit: defeatParams.unit,
               tb: defeatTb,
               hb: defeatHb
              //  aims: '',
              //  finished: ''
           };
      }
  }
 
 if (this.time.key === 'all') {
        let defeatTb = '';
        let defeatHb = '';
        let defeatParams = numberFormat(nowdefeatData.defeat);
        this.defeatData = {
               value: defeatParams.value ,
               unit: defeatParams.unit,
               tb: defeatTb,
               hb: defeatHb
              //  aims: '',
              //  finished: ''
           };
 }
      // console.log(olddefeatData , nowdefeatData);
  })
  .catch((e: any) => {
        this.defeatData = {
               value: '' ,
               unit: '',
               tb: '',
               hb: ''
              //  aims: '',
              //  finished: ''
           };
  });
}

//建卡api数据
// 6.12切换到订单
async getConverforsalesData() {

    let params = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString()
  };
    let aimsList: any = {
      type: '订单',
      timeType: this.time.key,
      brandId: this.brandId,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString()
    };

  if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length || this.checkedArea.length === 0 ) {
    delete params.rfsCodes;
    delete aimsList.rfsCodes;
    // let name = '全国';
    // rfsName = name;
  } 
  // console.log($commonData.seriesData.getSeriesMap(),'车系');
  let carName: any[] = [];
  let seriesName: any[] = [];
  $commonData.seriesData.getSeriesMap().forEach((item: any) => {
      if (Number(this.brandId) === item.brandId) {
        carName.push(item);
      }
  });
  carName[0].children.forEach((info: any) => {
      this.series.forEach((item: any) => {
        if (item === info.seriesId) {
            seriesName.push(info.seriesChineseName);
        }
      });
  });

  // console.log(seriesName , 'hahahah');
  aimsList.seriesIds = seriesName.toString();
    const data = await $api.DashboardApi.aimsData(aimsList);
    // console.log(data , '目标');
    let aim: any;
    if (data.now[0]) {
        aim = Number(data.now[0].kpi);
        // aim = aim.toFixed(2);
        aim = Math.round(aim);
        console.log(aim , '订单目标');
    } else {
        aim = '';
    }

$api.DashboardApi.order(params).then((res: any) => {
    console.log(res, '订单');
    let oldConverforsales = res.lsatYear[0];
    let nowConverforsales = res.now[0];
    let lastConverforsales = res.last[0];
    this.cardData = this.dealWithOrder(nowConverforsales , oldConverforsales , lastConverforsales , aim);

  } )
  .catch(e => {
         this.cardData = {
            value: '',
            unit: '',
            tb: '',
            hb: '',
            aims: aim === -9999 ? '' : aim,
            finished: ''
            };


  });
}

//传播api数据
getspreadData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString()
  };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
    }
  $api.DashboardApi.spreadData(params).then((res: any) => {
    console.log(res , '传播');
        let oldSpread = res.lsatYear[0];
        let nowSpread = res.now[0];
        let lastSpread = res.last[0];
        // console.log(oldSpread , nowSpread ,lastSpread);

         this.propagationData = this.propagation(nowSpread , oldSpread , lastSpread);
  })
  .catch(e => {
  this.propagationData = {
    value: '',
    unit: '',
    tb: '',
    hb: '',
    aims: '',
    finished: ''
  };
  });
}

//到店api数据
async getToshopData() {
  let params = {
    brandId: this.brandId,
    type: this.time.key,
    rfsCodes: this.checkedArea.toString(),
    seriesIds: this.series.toString()
  };
  let aimsList = {
  type: '客流',
  timeType: this.time.key,
  brandId: this.brandId,
  rfsCodes: this.checkedArea.toString(),
  seriesIds: this.series.toString()
};
      if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
      delete aimsList.rfsCodes;
    }
  let carName: any[] = [];
  let seriesName: any[] = [];
  $commonData.seriesData.getSeriesMap().forEach((item: any) => {
      if (Number(this.brandId) === item.brandId) {
        carName.push(item);
      }
  });
  carName[0].children.forEach((info: any) => {
      this.series.forEach((item: any) => {
        if (item === info.seriesId) {
            seriesName.push(info.seriesChineseName);
        }
      });
  });

  // console.log(seriesName , 'hahahah');
  aimsList.seriesIds = seriesName.toString();
  const data = await $api.DashboardApi.aimsData(aimsList);
    console.log(data , '到店目标');
  
  let aim: any;
  if (data.now[0]) {
    aim = Number(data.now[0].kpi);
    // aim = aim.toFixed(2);
    aim = Math.round(aim);
    console.log(aim , '到店kpi');
  } else {
    aim = '';
  }
  $api.DashboardApi.ToshopData(params).then((res: any) => {
    // console.log(res , '到店');
    
    //去年数据
    let oldTOshopData = res.lsatYear[0];
    //现在的数据
    let nowTOshopData = res.now[0];
    //上个月份的数据
    let lastTOshopData = res.last[0];
    this.rwtoShopData = this.dealWithShop(nowTOshopData , oldTOshopData , lastTOshopData , aim);
    // if ( !nowTOshopData ) {
    //       this.rwtoShopData = {
    //               value: '',
    //               unit: '',
    //               tb: '',
    //               hb: '',
    //               aims: '',
    //               finished:  '',
    //               average: '',
    //               offlineAverage: ''
    //             };
    //             return;
    //   }
    // // console.log(oldTOshopData , nowTOshopData , lastTOshopData);
    // if (this.time.key === 'year') {
    //     if (!lastTOshopData && nowTOshopData) {
    //   let toshopTb = '';
    //   let toshopHb = '';
    //   let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //   let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //       toShopAverage =  toShopAverage.toFixed(2);
    //   let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //       toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //  this.rwtoShopData = {
    //               value: toshopParams.value,
    //               unit: toshopParams.unit,
    //               tb: toshopTb,
    //               hb: toshopHb,
    //               aims: '',
    //               finished:  '',
    //               average: toShopAverage,
    //               offlineAverage: toShopOfflineAverage
    //             };
    //   } else {
    //   let toshopTb = calculation(nowTOshopData.visitsNums , lastTOshopData.visitsNums );
    //   let toshopHb = calculation(nowTOshopData.visitsNums , lastTOshopData.visitsNums);
    //   let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //   let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //       toShopAverage =  toShopAverage.toFixed(2);
    //   let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //       toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //             this.rwtoShopData = {
    //               value: toshopParams.value,
    //               unit: toshopParams.unit,
    //               tb: toshopTb,
    //               hb: toshopHb,
    //               aims: '',
    //               finished:  '',
    //               average: toShopAverage,
    //               offlineAverage: toShopOfflineAverage
    //             };
    //   }


    // }

    // if (this.time.key === 'month'  ||  this.time.key === 'threemonth' || this.time.key === 'day' || this.time.key === 'week') {
    //       if (!oldTOshopData) {
    //   let toshopTb = '';
    //   let toshopHb = calculation(nowTOshopData.visitsNums , lastTOshopData.visitsNums);
    //   let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //   let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //       toShopAverage =  toShopAverage.toFixed(2);
    //   let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //       toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //             this.rwtoShopData = {
    //               value: toshopParams.value,
    //               unit: toshopParams.unit,
    //               tb: toshopTb,
    //               hb: toshopHb,
    //               aims: '',
    //               finished:  '',
    //               average: toShopAverage,
    //               offlineAverage: toShopOfflineAverage
    //             };
    //       }
    //       else if (!lastTOshopData) {
    //              let toshopTb = calculation(nowTOshopData.visitsNums , oldTOshopData.visitsNums);
    //              let toshopHb = '';
    //              let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //              let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //                  toShopAverage =  toShopAverage.toFixed(2);
    //              let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //                  toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //                 this.rwtoShopData = {
    //                   value: toshopParams.value,
    //                   unit: toshopParams.unit,
    //                   tb: toshopTb,
    //                   hb: toshopHb,
    //                   aims: '',
    //                   finished:  '',
    //                   average: toShopAverage,
    //                   offlineAverage: toShopOfflineAverage
    //                  };
    //       }
    //       else if (!lastTOshopData && !oldTOshopData) {
    //              let toshopTb = '';
    //              let toshopHb = '';
    //              let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //              let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //                  toShopAverage =  toShopAverage.toFixed(2);
    //              let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //                  toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //                 this.rwtoShopData = {
    //                   value: toshopParams.value,
    //                   unit: toshopParams.unit,
    //                   tb: toshopTb,
    //                   hb: toshopHb,
    //                   aims: '',
    //                   finished:  '',
    //                   average: toShopAverage,
    //                   offlineAverage: toShopOfflineAverage
    //                  };
    //       } else {
    //         // console.log(111);
    //              let toshopTb = calculation(nowTOshopData.visitsNums , oldTOshopData.visitsNums);
    //              let toshopHb = calculation(nowTOshopData.visitsNums , lastTOshopData.visitsNums);
    //              let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //              let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //                  toShopAverage =  toShopAverage.toFixed(2);
    //              let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //                  toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //                 this.rwtoShopData = {
    //                   value: toshopParams.value,
    //                   unit: toshopParams.unit,
    //                   tb: toshopTb,
    //                   hb: toshopHb,
    //                   aims: '',
    //                   finished:  '',
    //                   average: toShopAverage,
    //                   offlineAverage: toShopOfflineAverage
    //                  };
    //       }

    //   // nowTOshopData.sort((a: any , b: any) => {
    //   // return a.month - b.month;
    //   //   });


    // }


    // if (this.time.key === 'all') {
    //   let toshopTb = '';
    //   let toshopHb = '';
    //   let toshopParams = numberFormat(nowTOshopData.visitsNums);
    //       let toShopAverage: any = nowTOshopData.onlineCycle / nowTOshopData.visitsNums;
    //           toShopAverage =  toShopAverage.toFixed(2);
    //      let toShopOfflineAverage: any = nowTOshopData.offlineCycle / nowTOshopData.visitsNums;
    //          toShopOfflineAverage =  toShopOfflineAverage.toFixed(2);
    //             this.rwtoShopData = {
    //               value: toshopParams.value,
    //               unit: toshopParams.unit,
    //               tb: toshopTb,
    //               hb: toshopHb,
    //               aims: '',
    //               finished:  '',
    //               average: toShopAverage,
    //               offlineAverage: toShopOfflineAverage
    //             };
    // }

    // if (this.time.key === 'week') {

    // }
    // nowTOshopData.sort((a: any , b: any) => {
    //   return a.month - b.month;
    // });


    // console.log(oldTOshopData , nowTOshopData);

  })
  .catch( e => {
          this.rwtoShopData = {
                  value: '',
                  unit: '',
                  tb: '',
                  hb: '',
                  aims: '',
                  finished:  ''
                };
  });   
}


  sumKpi(res: any) {
    if (res.length > 0) {
      res[0][this.time.key] = _.sumBy(res, (o: any) => {
        return o[this.time.key];
      });
    }
    return res;
  }

//总成交用户api数据
async getAlldealData() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString()
  };
  let aimsList = {
      type: '成交',
      timeType: this.time.key,
      brandId: this.brandId,
      rfsCodes: this.checkedArea.toString(),
      seriesIds: this.series.toString()
    };

  if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length || this.checkedArea.length === 0 ) {
    delete params.rfsCodes;
    delete aimsList.rfsCodes;
    // let name = '全国';
    // rfsName = name;
  } 
  let carName: any[] = [];
  let seriesName: any[] = [];
  $commonData.seriesData.getSeriesMap().forEach((item: any) => {
      if (Number(this.brandId) === item.brandId) {
        carName.push(item);
      }
  });
  carName[0].children.forEach((info: any) => {
      this.series.forEach((item: any) => {
        if (item === info.seriesId) {
            seriesName.push(info.seriesChineseName);
        }
      });
  });

  // console.log(seriesName , 'hahahah');
  aimsList.seriesIds = seriesName.toString();
const data = await $api.DashboardApi.aimsData(aimsList);
  // console.log(data , '成交目标');
  let aim: any;
  if (data.now[0]) {
    aim = Number(data.now[0].kpi);
    // aim = aim.toFixed(2);
    aim = Math.round(aim);
    console.log(aim , '成交值');
  } else {
    aim = '';
  }
  let finished: string = '';

      $api.DashboardApi.AlldealData(params).then((res: any) => {
        console.log(res , '总成交用户数');

        let oldAlldeal = res.lsatYear[0];
        let nowAlldeal = res.now[0];
        let lastAlldeal = res.last[0];
        this.allDealData = this.dealWithAlldeal(nowAlldeal , oldAlldeal , lastAlldeal, aim);
      })
      .catch(e => {
         this.allDealData = {
            value: '',
            unit: '',
            tb: '',
            hb: '',
            aims: aim === -9999 ? '' : aim,
            finished: finished,
            average: '',
            offlineAverage: ''
          };
      });
}


//战败模态框api数据
  getdefeatedEcharts() {
    let params = {
      brandId: this.brandId,
      type: this.time.key,
      rfsCodes: this.checkedArea.toString()
    };
    if ( this.checkedArea.length === $commonData.areaData.getAreaMap().length ) {
      delete params.rfsCodes;
    }
    let sum: number = 0;
    $api.DashboardApi.DetailData(params).then((res: any) => {
    this.defeatedEchartsText = [];
    this.defeatedEchartsNum = [];
    this.defeatedEchartsNumSum = 0;
    this.defeatedEchartsNumSumtotal = {
            value: '',
            unit: ''
      };
    this.defeatedEchartsNumRev = [];

      res.sort((a: any , b: any) => {
        return a.num - b.num;
      });
      res.forEach((item: any) => {
        this.defeatedEchartsText.push(item.defeatName);
        this.defeatedEchartsNum.push(item.num);
        sum += item.num;
        this.defeatedEchartsNumRev.push(`${numberFormat(item.num).value}${numberFormat(item.num).unit}`);
      });
      
      this.defeatedEchartsNumRev.reverse();
      this.defeatedEchartsNumSum = sum;
      let defeatparam = numberFormat(this.defeatedEchartsNumSum);
      this.defeatedEchartsNumSumtotal.value = defeatparam.value;
      this.defeatedEchartsNumSumtotal.unit = defeatparam.unit;



    })
    .catch(e => {
    this.defeatedEchartsText = [];
    this.defeatedEchartsNum = [];
    this.defeatedEchartsNumSum = 0;
    this.defeatedEchartsNumSumtotal = {
            value: '',
            unit: ''
      };
    this.defeatedEchartsNumRev = [];
    });
  }
//换算数据单位
//   numberFormat(value: any) {
//      let param: any = {};
//      let k = 10000,
//       sizes = ['' , '万', '亿', '万亿'],
//       i;
//       if (value < k) {
//           param.value = value;
//           param.unit = '';
//       } else {
//           i = Math.floor(Math.log(value) / Math.log(k)); 
    
//           param.value = ((value / Math.pow(k, i))).toFixed(2);
//           param.unit = sizes[i];
//       }
//     return param;
// }

  //重置数据
  resetData() {
    let data = {
          value: '' ,
          unit: '',
          tb: '',
          hb: '',
          aims: '',
          finished: ''
          // proportion: ''
      };

  return data;

  }

//分类渠道数据处理函数
  operationData(now: any, old: any , last: any , aim: any) {

    let publics: any = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: ''
    };
    if (aim !== -9999) {
      let aimUnit = numberFormat(aim);
      publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
      if (now.length === 0) {
        if (aim !== -9999) {
          publics.finished = '0%';
        }
          return publics;
      }
      else {
      // let proprtion: any = (now[0].distinctLeadsNums / now[0].leadsNum ) * 100;
      //     proprtion = `${proprtion.toFixed(2)}%`;
      let params = numberFormat(now[0].opporNum);
      publics.value = params.value;
      publics.unit = params.unit;
      if (aim !== -9999) {
          publics.finished = finishingRate(now[0].opporNum , aim);
        }
      }
      if (old.length === 0) {
        publics.tb = '';
        // if (this.time.key !== 'year') {
        // publics.tb = '';
        // }
      } else {
        publics.tb = calculation(now[0].opporNum , old[0].opporNum);
      }

      if (last.length === 0) {
         publics.hb = '';

      //  if (this.time.key === 'year') {
      //     publics.hb = publics.tb = '';
      //  } else {
      //    publics.hb = '';
      //  }
      } else {
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(now[0].opporNum , last[0].opporNum);
        } else {
        publics.hb = calculation(now[0].opporNum , last[0].opporNum);
        }
      }

      return publics;

  }

  allOperationData(now: any , aim: any) {
    let publics: any = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: ''
    };
    if (aim !== -9999) {
       let aimUnit = numberFormat(aim);
       publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
    if (now.length === 0) {
    if (aim !== -9999) {
      publics.finished = '0%';
    }
      return publics;
    }
    else {
    // let proprtion: any = (now[0].distinctLeadsNums / now[0].leadsNum ) * 100;
    //       proprtion = `${proprtion.toFixed(2)}%`;
      let params = numberFormat(now[0].opporNum);
      publics.value = params.value;
      publics.unit = params.unit;
          if (aim !== -9999) {
      publics.finished = finishingRate(now[0].opporNum , aim);
    }
      // publics.proportion = proprtion;
    }
   return publics;



  }

  //计算总和数据
  sumData (now: any , old: any, last: any , aim: any) {
    let publics = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: ''
    };
    if (aim !== -9999) {
      let aimUnit = numberFormat(aim);
      publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
    if (now === 0) {
      if (aim !== -9999) {
          publics.finished = '0%';
      }
      return publics;
    } else {
      let params = numberFormat(now);
      publics.value = params.value;
      publics.unit = params.unit;
     if (aim !== -9999) {
          publics.finished = finishingRate(now , aim);
      }
    }

    if (old === 0) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now, old);
    } 

    if (last === 0) {
       publics.hb = '';
    } else {
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(now , last);
        } else {
        publics.hb = calculation(now, last);
        }
    }

    return publics;

  }

  allSumData(now: any , aim: any) {
    let publics: any = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: '',
        proportion: ''
    };
        if (aim !== -9999) {
      let aimUnit = numberFormat(aim);
      publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
    if (now === 0) {
      if (aim !== -9999) {
        publics.finished = '0%';
      }
      return publics;
    }
    else {
      let params = numberFormat(now);
      publics.value = params.value;
      publics.unit = params.unit;
      if (aim !== -9999) {
          publics.finished = finishingRate(now , aim);
      }
    }
   return publics;
  }

  //传播数据处理
  propagation(now: any , old: any , last: any) {
    let publics = {
        value: '',
        unit: '',
        tb: '',
        hb: '',
        aims: '',
        finished: ''
    };
    if (!now) {
      return publics;
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let params = numberFormat(nowVisitors);
      publics.value = params.value;
      publics.unit = params.unit;
    }

    if (!old) {
      publics.tb = '';
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let oldVisitors = old.newVisitors + old.oldVisitors;
      publics.tb = calculation(nowVisitors, oldVisitors);
    } 

    if (!last) {
       publics.hb = '';
    } else {
      let nowVisitors = now.newVisitors + now.oldVisitors;
      let lastVisitors = last.newVisitors + last.oldVisitors;
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(nowVisitors , lastVisitors);
          console.log(111);
        }  else if (this.time.key === 'all') {
          publics.hb = publics.tb = '';
        }
        
        else {
        publics.hb = calculation(nowVisitors, lastVisitors);
        }
    }

    return publics;
  }

  //总成交用户数据处理
  dealWithAlldeal(now: any , old: any , last: any, aim: number) {
      let publics = {
            value: '',
            unit: '',
            tb: '',
            hb: '',
            aims: '',
            finished: '',
            average: '',
            offlineAverage: ''
      };
    if ( aim !== -9999 ) {
      let aimUnit = numberFormat(aim);
      publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
    if (!now) {
      if ( aim !== -9999 ) {
        publics.finished = '0%';
      }
      return publics;
    } else {
      let params = numberFormat(now.num);
      publics.value = params.value;
      publics.unit = params.unit;
        let average: any = now.onlineCycle / now.custNum;
            average = average.toFixed(2);
        let offlineAverage: any = now.offlineCycle / now.custNum;
            offlineAverage = offlineAverage.toFixed(2);
      publics.average = average;
      publics.offlineAverage = offlineAverage;
      if ( aim !== -9999 ) {
        publics.finished = finishingRate(now.num, aim);
      }
    }

    if (!old) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now.num, old.num);
    } 

    if (!last) {
       publics.hb = '';
    } else {
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(now.num , last.num);
        }  else if (this.time.key === 'all') {
          publics.hb = publics.tb = '';
        }
        
        else {
        publics.hb = calculation(now.num, last.num);
        }
    }

    return publics;
  }

  //订单数据处理
    dealWithOrder(now: any , old: any , last: any, aim: number) {
      let publics = {
            value: '',
            unit: '',
            tb: '',
            hb: '',
            aims: '',
            finished: ''
      };
      if ( aim !== -9999 ) {
       let aimUnit = numberFormat(aim);
       publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
    if (!now) {
      if ( aim !== -9999 ) {
        publics.finished = '0%';
      }
      return publics;
    } else {
      let params = numberFormat(now.isXiadan);
      publics.value = params.value;
      publics.unit = params.unit;
      if ( aim !== -9999 ) {
        publics.finished = finishingRate(now.isXiadan, aim);
      }
    }

    if (!old) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now.isXiadan, old.isXiadan);
    } 

    if (!last) {
       publics.hb = '';
    } else {
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(now.isXiadan , last.isXiadan);
        }  else if (this.time.key === 'all') {
          publics.hb = publics.tb = '';
        }
        
        else {
        publics.hb = calculation(now.isXiadan, last.isXiadan);
        }
    }

    return publics;
  }

  //到店数据处理
      dealWithShop(now: any , old: any , last: any, aim: number) {
      let publics = {
            value: '',
            unit: '',
            tb: '',
            hb: '',
            aims: '',
            finished: ''
      };
      if ( aim !== -9999 ) {
      let aimUnit = numberFormat(aim);
      publics.aims = `${aimUnit.value}${aimUnit.unit}`;
      // publics.aims = aim.toString();
    }
    if (!now) {
      if ( aim !== -9999 ) {
        publics.finished = '0%';
      }
      return publics;
    } else {
      let params = numberFormat(now.visitsNums);
      publics.value = params.value;
      publics.unit = params.unit;
      if ( aim !== -9999 ) {
        publics.finished = finishingRate(now.visitsNums, aim);
      }
    }

    if (!old) {
      publics.tb = '';
    } else {
      publics.tb = calculation(now.visitsNums, old.visitsNums);
    } 

    if (!last) {
       publics.hb = '';
    } else {
        if (this.time.key === 'year') {
          publics.hb = publics.tb = calculation(now.visitsNums , last.visitsNums);
        }  else if (this.time.key === 'all') {
          publics.hb = publics.tb = '';
        }
        
        else {
        publics.hb = calculation(now.visitsNums, last.visitsNums);
        }
    }

    return publics;
  }

  jump() {
    if (window.location.hostname === 'marketingkpi-qa-pv.saicmotortest.com') {
      window.open('http://10.129.145.54:8180/WebReport/decision/view/form?viewlet=%25E8%2590%25A5%25E9%2594%2580%25E9%2597%25AD%25E7%258E%25AF%252F%25E8%2590%25A5%25E9%2594%2580%25E9%2597%25AD%25E7%258E%25AF%25E7%259C%258B%25E6%259D%25BF.frm&ref_t=design&ref_c=9a0cd63b-0594-4b1f-b8a2-b2b0a5d57d89');
    } else {
      window.open('http://finereport-pv.saicmotor.com/WebReport/decision/view/form?viewlet=%25E8%2590%25A5%25E9%2594%2580%25E9%2597%25AD%25E7%258E%25AF%252FMG%25E6%2584%258F%25E5%2590%2591%25E6%2598%258E%25E7%25BB%2586V3.0.frm&ref_t=design&ref_c=1d64fb55-64b9-4143-b12a-b1bb6a2622eb');
    }
  }

  marketJump() {
    window.open('https://dscbi-pv.saicmotor.com/webroot/decision/v5/design/report/share/a43d1805fb904c59a45dd0b9df2e7eb2?link=eyJhbGciOiJIUzI1NiJ9.eyJyZXBvcnRJZCI6ImE0M2QxODA1ZmI5MDRjNTlhNDVkZDBiOWRmMmU3ZWIyIiwidXNlcklkIjoiNzMwZTdjMWYtZTE5NS00NzBhLWIyNmYtYWFkMTA1MjI5ODY0IiwianRpIjoiand0In0.fzUiXBtzdIu1hWXAlJ55EnSYpu6hXyOS63UXweSFNkc');
  }

  //第一方触点柱状图数据
  contactEchart() {
    let o = this.contactLevel.oLevel;
    let h = this.contactLevel.hLevel;
    let b = this.contactLevel.bLevel;
    let c = this.contactLevel.cLevel;
    let a = this.contactLevel.aLevel;
    let n = this.contactLevel.nLevel;
    let aim = this.targetValue.contactAim;
          let contact = (this as any).$echarts.init(this.$refs.contactEchart);
          contact.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:200px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`厂方分配\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已下单',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [o],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '7天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [h],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '15天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [a],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '30天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [b],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '1-3个月订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [c],
            itemStyle: {
              normal: { color: '#EBCD52' }
            }
          },
          {
            name: '3个月以上订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [n],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [aim],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            contact.resize();
        });
  }

  //垂媒柱状图数据
  verticalMediaEchart() {
    let o = this.verticalMediaLevel.oLevel;
    let h = this.verticalMediaLevel.hLevel;
    let b = this.verticalMediaLevel.bLevel;
    let c = this.verticalMediaLevel.cLevel;
    let a = this.verticalMediaLevel.aLevel;
    let n = this.verticalMediaLevel.nLevel;
    let aim = this.targetValue.verticalMedia;
          let verticalMedia =  (this as any).$echarts.init(this.$refs.verticalMediaEchart);
          verticalMedia.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:200px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`垂媒\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已下单',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [o],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '7天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [h],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '15天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [a],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '30天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [b],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '1-3个月订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [c],
            itemStyle: {
              normal: { color: '#EBCD52' }
            }
          },
          {
            name: '3个月以上订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [n],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [aim],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            verticalMedia.resize();
        });
  }

  //外拓获客
  outreachEchart() {
    let o = this.outreachDataLevel.oLevel;
    let h = this.outreachDataLevel.hLevel;
    let b = this.outreachDataLevel.bLevel;
    let c = this.outreachDataLevel.cLevel;
    let a = this.outreachDataLevel.aLevel;
    let n = this.outreachDataLevel.nLevel;
    let aim = this.targetValue.outreach;
          let outreachEchart =  (this as any).$echarts.init(this.$refs.outreachEchart);
          outreachEchart.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:200px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`外拓获客\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已下单',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [o],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '7天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [h],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '15天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [a],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '30天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [b],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '1-3个月订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [c],
            itemStyle: {
              normal: { color: '#EBCD52' }
            }
          },
          {
            name: '3个月以上订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [n],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [aim],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            outreachEchart.resize();
        });

  }

  //自然获客
  naturalEchart() {
    let o = this.naturalLevel.oLevel;
    let h = this.naturalLevel.hLevel;
    let b = this.naturalLevel.bLevel;
    let c = this.naturalLevel.cLevel;
    let a = this.naturalLevel.aLevel;
    let n = this.naturalLevel.nLevel;
    let aim = this.targetValue.natural;
        let naturalEchart =  (this as any).$echarts.init(this.$refs.naturalEchart);
        naturalEchart.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:200px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`自然获客\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已下单',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [o],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '7天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [h],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '15天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [a],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '30天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [b],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '1-3个月订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [c],
            itemStyle: {
              normal: { color: '#EBCD52' }
            }
          },
          {
            name: '3个月以上订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [n],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [aim],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            naturalEchart.resize();
        });

  } 

  //电商柱状图数据
  dianshangEchart() {
        let dianshangEchart =  (this as any).$echarts.init(this.$refs.dianshangEchart);
        dianshangEchart.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:160px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`电商\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已付定金',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [320],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '高意向',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [120],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '中意向',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [220],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '低意向',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [150],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '战败',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [50],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [0],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            dianshangEchart.resize();
        });
  }

 //获客云柱状图数据
 huokeyunEchart() {
        let huokeyunEchart =  (this as any).$echarts.init(this.$refs.huokeyunEchart);
        huokeyunEchart.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:160px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`获客云\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已付定金',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [320],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '高意向',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [120],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '中意向',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [220],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '低意向',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [150],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '战败',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [50],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [0],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            huokeyunEchart.resize();
        });
 }

//荣威战败池柱状图数据
defeatpoolEchart() {
        let defeatpoolEchart =  (this as any).$echarts.init(this.$refs.defeatpoolEchart);
        defeatpoolEchart.setOption({
            tooltip: {
                   trigger: 'axis',
                  backgroundColor: '#F9F9F9',
                  borderRadius: 12,
                  padding: [30, 30],
                  formatter: (params: any, ticket: string): string => {
                    // console.log(params);

                    let str: string = `${params[0].name}`;
                    params.forEach( (item: any) => {
                      str += `<div style="color:#000000;margin-top:10px"><span style="display:inline-block;margin-right:20px;width:20px;height:20px;background-color:${item.color}"></span><span style="width:200px;display:inline-block">${item.seriesName}</span>${item.value}</div> `;
                    } );
                    return str;
        },
             textStyle: {
                 color: '#666666',
                 fontSize: 28,
                 width: 578,
                 height: 304
            }
         },
          xAxis: {
          show: false,
          type: 'category',
          data: [`战败池\xa0\xa0\xa0\xa0\xa0${this.time.type}`]
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已下单',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [320],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '7天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [120],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '15天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [220],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '30天内订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [150],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '1-3个月订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [50],
            itemStyle: {
              normal: { color: '#EBCD52' }
            }
          },
          {
            name: '3个月以上订车',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [50],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [0],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            defeatpoolEchart.resize();
        });
}

//R标培育池柱状图数据
nurtureEchart() {
        let nurtureEchart =  (this as any).$echarts.init(this.$refs.nurtureEchart);
        nurtureEchart.setOption({
          xAxis: {
          show: false,
          type: 'category',
          data: ['Mon']
          },
          yAxis: {
          show: false,
          type: 'value'
         },
         grid: {
          top: 0,
          bottom: 0,
          left: 0,
          right: 0
         },
         series: [
          {
            name: '已付定金-O',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [320],
            itemStyle: {
              normal: { color: '#65A7EA' }
            }
          },
          {
            name: '高意向-H',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [120],
            itemStyle: {
              normal: { color: '#6BC7E6' }
            }
          },
          {
            name: '中意向-A',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [220],
            itemStyle: {
              normal: { color: '#4EDFD1' }
            }
          },
          {
            name: '低意向-B',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [150],
            itemStyle: {
              normal: { color: '#89E388' }
            }
          },
          {
            name: '战败',
            type: 'bar',
            stack: '广告',
            // barWidth: '100%',
            data: [50],
            itemStyle: {
              normal: { color: '#F27A7A' }
            }
          },
          {
            name: '目标',
            type: 'bar',
            // barWidth: '100%',
            data: [0],
            itemStyle: {
              normal: { color: '#236BB4' }
            }
          }
        ]
      });
        window.addEventListener('resize', function () {
            nurtureEchart.resize();
        });
}

//战败柱状图数据 
defeatedEchart() { 
  // let defeatedContainer = (this as any).$echarts.init(document.getElementById('defeatedEchart'));
  // this.$nextTick(() => {
    let defeatedContainer =  (this as any).$echarts.init(this.$refs.defeatedEchart);
    defeatedContainer.setOption({
      tooltip: {
        show: false,
        trigger: 'axis',
        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
        }
      },
      grid: {
        top: 0,
        left: 0,
        right: '12%',
        bottom: 0,
        containLabel: true
      },
      xAxis: {
        show: false,
        max: Math.max(...this.defeatedEchartsNum),
        type: 'value'
      },
      yAxis: {
        splitLine: {
            show: false
          },
          //刻度线
          axisTick: {
            show: false
          },
          //轴线
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: 'rgba(255,255,255,0.6)',
            },
            fontSize: 24
          },
        type: 'category',
        data: this.defeatedEchartsText
      },
      series: [
        {
          type: 'bar',
          stack: '总量',
          label: {
            show: false,
            position: 'right', 
            fontSize: 24
          },
          showBackground: true,
          backgroundStyle: {
              // color: '#021722'
              color: '#021722'
          },
          itemStyle: {
            normal: { color: '#236BB4' }
          },
          data: this.defeatedEchartsNum
        }
      ]
      });
      window.addEventListener('resize', function () {
          defeatedContainer.resize();
      });

    // console.log(defeatedContainer);
  // });
}

//培育池弹框数据
getNtmodalEchart() {
  this.$nextTick(() => {
    let ntmodalEchart = (this as any).$echarts.init(this.$refs.ntmodalEcharts);
    let option = {
       legend: {
        data: ['高意向-H', '中意向-A', '低意向-B' , '战败-F'],
        itemWidth: 40,
        itemHeight: 40,
        itemGap: 66,
        bottom: 10,
        textStyle: {
          fontSize: 32,
          color: '#FFFFFF'
        }
    },
    grid: {
      top: 38,
      bottom: 140,
      right: 66
    },
       xAxis: 
        {
            type: 'category',
            axisTick: {
               show: false
              },
          //轴线
          axisLine: {
            show: false
          },
            data: ['1天', '2天', '3天', '4天', '5天', '6天', '7天', '14天', '1个月', '3个月', '6个月', '1年', '1年以上'],
            axisPointer: {
                type: 'shadow'
            },
          axisLabel: {
                margin: 30,
                textStyle: {
                  color: 'rgba(255,255,255,0.6)',
                },
                fontSize: 28
           }
        },
    yAxis: 
        {
        axisTick: {
            show: false
          },
          //轴线
          axisLine: {
            show: false
          },
          splitLine: {
            show: true,
            //设置y轴线的颜色
            lineStyle: {
              color: '#0B4D5E'
            }
          },
            type: 'value',
            min: 0,
            max: 2000,
            interval: 500,
            axisLabel: {
                margin: 24,
                textStyle: {
                  color: 'rgba(255,255,255,0.6)',
                },
                fontSize: 28
           }
        },
    series: [
        {
            name: '高意向-H',
            type: 'bar',
            stack: '数据',
            data: [200, 490, 700, 230, 250, 760, 135, 160, 326, 200, 640, 330, 400],
            itemStyle: {
              normal: { color: '#B39933' }
            }
        },
        {
            name: '中意向-A',
            type: 'bar',
            stack: '数据',
            data: [300, 390, 600, 330, 350, 660, 235, 260, 226, 300, 740, 430, 500],
                        itemStyle: {
              normal: { color: '#12B5C0' }
            }
        },
        {
            name: '低意向-B',
            type: 'bar',
            stack: '数据',
            data: [200, 490, 500, 350, 250, 560, 435, 360, 326, 400, 640, 530, 400],
            itemStyle: {
              normal: { color: '#04A063' }
            }
        },
                {
            name: '战败-F',
            type: 'bar',
            stack: '数据',
            data: [340, 290, 300, 550, 450, 360, 235, 460, 226, 300, 540, 430, 200],
            itemStyle: {
              normal: { color: '#1464C8' }
            }
        },
        {
            name: '高意向',
            type: 'line',
            data: [200, 490, 700, 230, 250, 760, 135, 160, 326, 200, 640, 330, 400],
            itemStyle: {
              normal: { color: '#B39933' }
            }
        },
        {
            name: '中意向',
            type: 'line',
            data: [300, 390, 600, 330, 350, 660, 235, 260, 226, 300, 740, 430, 500],
            itemStyle: {
              normal: { color: '#12B5C0' }
            }
        },
        {
            name: '低意向',
            type: 'line',
            data: [200, 490, 500, 350, 250, 560, 435, 360, 326, 400, 640, 530, 400],
            itemStyle: {
              normal: { color: '#04A063' }
            }
        },
        {
            name: '战败',
            type: 'line',
            data: [340, 290, 300, 550, 450, 360, 235, 460, 226, 300, 540, 430, 200],
            itemStyle: {
              normal: { color: '#1464C8' }
            }
        }
    ]
    };
    ntmodalEchart.setOption(option);
    window.addEventListener('resize', function () {
       ntmodalEchart.resize();
    });

  });
}

changeDefeated() {
this.changeDefeatedModal = true;
}

closeDefeat() {
  // console.log(1111);
this.changeDefeatedModal = false;

}
//R标
  rMark() {
    this.showR = true;
    this.showRoewe = false;
    this.showNotr = true;
    this.showRaera = true; 
    this.showTransform1 = true;
    this.showTransform2 = true; 
    this.nurtureArrow = false;

    this.showRwarrow = false;
    this.showrwTransform = false;
    this.showrwTransform1 = false;
  }

//荣威
  roewe() {
    this.showRoewe = true;
    this.showR = false;
    this.showNotr = false;
    this.showRaera = false; 
    this.showTransform1 = false;
    this.showTransform2 = false; 
    this.nurtureArrow = true;

    this.showRwarrow = true;
    this.showrwTransform = true;
    this.showrwTransform1 = true;

  }
 }
</script>

<style lang="scss" >
.dashboard-warp{
  flex: 1;
  padding:0 80px 0 60px;
    .closedLoop{
      width: 100%;
      height: 100%;
      

       .loopContent{
         width: 100%;
         height: 100%;
         // background: $box-bg-primary;
         display: flex;
          .loopData{
          width: 100%;
          height: 100%;
          // padding-left: 38px 40px 36px 40px;
          position: relative;
          box-sizing: border-box;
          font-size: 24px;
          color:rgba(255,255,255,1);

          .iconfont{
              font-size: 24px;
          }

             .fissionContent{
             width: 100%;
            //  height: 650px;
             // background-color: #000;
             margin-bottom: 104px;
            //  padding: .38px .4px 0 .4px;
             display: flex;
                .fissionLeft{
                width: 460px;
                height: 700px;
                margin-right: 70px;
                padding-top: 194px;
                padding-left: 134px;

                    .social{
                      font-size: 24px;
                      color:rgba(255,255,255,1);

                          .socialTitle{
                            font-size: 28px;
                            margin-bottom: 4px;
                          }

                          .socialData{
                            span{
                              font-size: 40px;
                              font-weight:500;
                              color:rgba(10,201,205,1);
                              padding-right: 8px;
                            }
                          }

                          .tbValue{
                            display: flex;

                            .tb{
                              margin-right: 16px;
                            }
                            // .tbPercentage{

                            // }
                          }

                          .hbValue{
                            display: flex;

                            .hb{
                              margin-right: 16px;
                            }
                            // .hbPercentage{

                            // }
                          }

                          // .aimsValue{

                          // }

                          .publicMagrin{
                            margin-right: 28px;
                          }

                         .percentageData{
                            margin-left: 4px;
                                }

                    }
                  }

                    .fissionRight{
                    height: 100%;
                    flex: 1;

                      .propagation{
                        width: 100%;
                        height: 168px;
                        margin-bottom: 98px;
                        display: flex;
                          .propagationData{
                            width: 1694px;
                            height: 100%;
                            padding-top: 28px;
                            padding-left: 390px;

                              .propagationTitle{
                                height:44px;
                                font-size:34px;
                                font-weight:500;
                                color:rgba(248,249,249,1);
                                line-height:44px;
                                margin-bottom: 8px;
                              }

                              .propagationValue{
                                display: flex;
                                font-size: 29px;
                                color:rgba(255,255,255,1);
                                height: 56px;
                                line-height: 56px;
                                  .billion{
                                    margin-right: 60px;
                                    font-size: 34px;
                                      span{
                                        font-size: 58px;
                                        font-weight:500;
                                        color:#fff;
                                        margin-right: 8px;
                                      }
                                  }

                                  .propagationTbdata{
                                    display: flex;
                                    margin-right: 76px;
                                    padding-top: 5px;

                                      .propagationTb{
                                        margin-right: 18px;
                                        // padding-top: .05px;
                                        color: $color-white-opacity;
                                      }

                                  }

                                  .propagationAims{
                                    margin-right: 76px;
                                    padding-top: 5px;
                                      .propagationaimsValue{
                                        color: $color-white-opacity;
                                        padding-right: 16px;
                                      }

                                  }
                              }
                          }
                          .propagationIcon{
                            height: 100%;
                            flex: 1;
                            font-size: 32px;
                            padding-top: 24px;
                            padding-left: 80px;
                            .publicPropagetion{
                              width: 40px;
                              height: 40px;
                              margin-right: 18px;
                            }
                            .deposit{
                              .publicPropagetion{
                                background-color: #65A7EA;
                              }
                            }
                            .o{
                              .publicPropagetion{
                                background-color: #65A7EA;
                              }
                            }
                            .h{
                              margin-left: 120px;
                              .publicPropagetion{
                                background-color: #6BC7E6;
                              }
                            }
                            .a{
                              margin-left: 67px;
                              .publicPropagetion{
                                background-color: #4EDFD1;
                              }
                            }
                            .b{
                              .publicPropagetion{
                                background-color: #89E388;
                              }
                            }
                            .c{
                              margin-left: 56px;
                              .publicPropagetion{
                                background-color: #EBCD52;
                              }
                            }
                            .n{
                              margin-left: 39px;
                              .publicPropagetion{
                                background-color: #F27A7A;
                              }
                            }
                            .aimsBgcolor{
                              margin-left: 89px;
                              .publicPropagetion{
                                background-color: #236BB4;
                              }
                            }
                              .propagationTop{
                                height: 40px;
                                display: flex;
                                margin-bottom: 46px;
                                line-height: 40px;
                                color: $color-white-opacity;
                                  .iconColor{
                                    height: 100%;
                                    // background-color: pink;
                                    display: flex;
                                  }
                              }

                              .propagationBottom{
                                width: 100%;
                                height: 40px;
                                display: flex;

                                  .iconColor{
                                    color: $color-white-opacity;
                                    height: 100%;
                                    display: flex;
                                  }
                              }
                          }
                      }

                      .channelData{
                        width: 100%;
                        height: 436px;
                        // background-color: pink;
                        display: flex;

                          .contact{
                            width: 720px;
                            height: 100%;
                            margin-right: 20px;
                            padding-top: 86px;
                            padding-left: 100px;
                                .contactContent{
                                  font-size: 24px;
                                  color:rgba(255,255,255,1);
                                  display: flex;
                                  .contactTitle{
                                      height: 40px;
                                      font-size: 34px;
                                      font-weight:400;
                                      color:rgba(248,249,249,1);
                                      line-height: 40px;
                                      margin-bottom: 4px;
                                  }

                                    .contactTb{
                                      display: flex;
                                      height: 34px;
                                      line-height: 34px;
                                      margin-bottom: 4px;

                                    }

                                    .contactHb{
                                      display: flex;
                                      height: 34px;
                                      line-height: 34px;
                                      margin-bottom: 4px;
                                    }

                                    .contactAims{
                                       height: 34px;
                                       line-height: 34px;
                                       margin-bottom: 4px;
                                    }

                                    .contactFinished{
                                         height: 34px;
                                       line-height: 34px;
                                    }
                                }

                              .contactOtherData{
                                width: 82px;
                                height: 100%;
                                background-color: #65A7EA;
                              }

                              .contactAimsData{
                                width: 82px;
                                height: 100%;
                                margin-left: 8px;
                                background-color: #236BB4;
                              }
                          }

                          .verticalMedia{
                            width: 720px;
                            height: 100%;
                            margin-right: 20px;
                            padding-top: 86px;
                            padding-left: 100px;

                                .verticalMediaContent{
                                  font-size: 24px;
                                  color:rgba(255,255,255,1);
                                  display: flex;
                                    // .verticalMediaTb{
                                    //   display: flex;
                                    // }
                                }
                          
                          }

                          .customers{
                            height: 100%;
          
                            // width: 880px;
                            flex: 1;
                            // margin-right: 29px;
                            padding-top: 36px;
                            padding-bottom: 40px;
                            display: flex;
                            font-size: 24px;
                            color:rgba(248,249,249,1);
                              .outreach{
                                width: 50%;
                                height: 100%;
                                // background-color: pink;
                                border-right: 2px solid #3A4263;
                                padding-left: 100px;
                                padding-top: 54px;
                                display: flex;
                                position: relative;
                              }

                              .natural{
                                width: 50%;
                                height: 100%;
                                padding-left: 100px;
                                padding-top: 54px;
                                display: flex;
                                position: relative;
                              }
                          }

                          .commerce{
                            height: 100%;
          
          
                            width: calc(100% - 1966px);
                            display: flex;
                            font-size: 24px;
                            color:rgba(248,249,249,1);
                            padding-top: 36px;
                            padding-bottom: 40px;

                              .dianshang{
                                width: 50%;
                                height: 100%;
                                // background-color: pink;
                                border-right: 2px solid #3A4263;
                                padding-left: 124px;

                              }

                              .huokeyun{
                                width: 50%;
                                height: 100%;
                                // padding-left: .12px;
                                padding-left: 120px;
                                // background-color: #fff;
                              }
                          }
                      }
                  }

                  .deduplication{
                    height: 34px;
                    line-height: 34px;
                    margin-top: 4px;
                  }

              }
  
             .clueAllocation{
               width: 100%;
               height: 166px;
               margin-bottom: 100px;
               padding-top: 30px;
               padding-left: 1198px;
               font-size: 24px;
               color:rgba(248,249,249,1) ;
               position: relative;
                .intention-detail{
                  position: absolute;
                  right: 78px;
                  bottom: 0;top: 0;
                  margin: auto;
                  width: 246px;
                  height: 80px;
                  font-size: 28px;
                  background:rgba(35,107,180,1);
                  border-radius:16px;
                  border:3px solid rgba(58,66,99,1);
                }
                  .clueAllocationTitle{
                    font-size: 34px;
                    height: 44px;
                    font-weight:500;
                    color:rgba(248,249,249,1);
                    line-height:44px;
                    margin-bottom: 8px;
                  }

                  .clueAllocationValue{
                    display: flex;
                    height: 56px;
                    line-height: 56px;
                    font-size: 29px;

                       .thousand{
                         margin-right: 60px;
                         font-size: 34px;
                       }

                       .clueAllocationTb{
                         display: flex;
                        padding-top: 5px;
                        margin-right: 68px;
                       }
                       
                       .clueAllocationHb{
                        display: flex;
                        padding-top: 5px;
                        margin-right: 68px;
                       }

                       .clueAllocationAims{
                        padding-top: 5px;
                        margin-right: 68px;
                       }

                       .clueAllocationFinished{
                        padding-top: 5px;
                       }
                  }
             }

             .specificDistribution{
             width: 100%;
             height: calc(100% - 908px);
            //  height: 6.96px;
            //  background-color: #000;

                .specificTop{
                  width: 100%;
                  height: 320px;
                  // background-color: pink;
                  margin-bottom: 56px;
                  display: flex;
                  justify-content: space-between;

                   .nurture{
                     width: 1108px;
                     height: 100%;
    
    
                     padding-top: 40px;
                     padding-bottom: 32px;
                     padding-left: 360px;
                     font-size: 24px;
                     color:rgba(248,249,249,1);
                     position: relative;

                          .usersIcon{
                            width: 56px;
                            height: 44px;
                            position: absolute;
                            background: url('../../assets/img/uesrs.png') no-repeat;
                            background-size: cover;
                            top: 24px;
                            right: 40px;
                            cursor:pointer;
                          }
                        .nurtureContent{
                          // width: 530px;
                          width: 100%;
                          height: 100%;
                          // margin: auto;
                          // background-color: #fff;
                          display: flex;

                            .nurtureEchart{
                              width: 172px;
                              height: 240px;
                              // background-color:pink;
                              margin-left: 72px;
                            }
                        }
                   }

                  .Rwang{
                    height: 100%;
                    width: 1108px;
                    padding-top: 54px;
                    padding-bottom: 56px;
                    padding-left: 354px;
                  }

                  .offline{
                    height: 100%;
                    width: 1108px;
                    padding-top: 54px;
                    padding-left: 376px;
                  }

                    .publicContentStyle{
                      // margin: auto;
                      // text-align: center;
                        .RwangTb{
                          display: flex;
                          height: 34px;
                          line-height: 34px;
                          margin-bottom: 4px;

                          .Rwangtims{
                            margin-left: 60px;
                          }
                        }

                        .average{
                          height: 34px;
                          line-height: 34px;

                          .tian{
                            margin-left: 28px;
                            color: #0AC9CD;
                          }
                          .white {
                            color: #ffffff;
                          }
                        }
                    }
                }

                .specificBottom{
                  width: 100%;
                  height: calc(100% - 376px);


                  position: relative;
                  padding-top: 1%;
                  padding-left: 362px;

                        .totalusersValue{
                          display: flex;

                          .cycle{
                            margin-left: 60px;
                            
                             .intention{
                               height: 34px;
                               line-height: 34px;
                               margin-bottom: 4px;
                             }

                             .publicCycleColor{
                               color: #09C6CA;
                               margin-left: 14px;
                             }
                          }
                        }

                    .deal{
                      position: absolute;
                      top: 5%;
                      right: 48px;
                      width: 2222px;
                      height: 90%;
    
    
                      display: flex;
                      padding-top: 1%;

                        .f-friend{
                          width: 530px;
                          height: 100%;
                          margin-left: 354px;
                          // background-color:pink;
                        }

                        .offlineExperience{
                          width: 530px;
                          height: 100%;
                          // background-color: #fff;
                          margin-left: 656px;
                        }


                    }
                }
            }

            .specificDistributionRoewe{
              width: 100%;
              // height: calc(100% - 908px);
              // background-color: #fff;
              display: flex;
              flex-wrap:wrap;
              align-items: center;
              justify-content: space-between;
              .rwContent:first-child{
                margin-bottom: 92px;
              }
              .rwContent:nth-child(2){
                margin-bottom: 92px;
              }
              .paddingleft-340{
                padding-left: 342px !important;
              }
              .paddingleft-446{
                padding-left: 446px !important;
              }
              .rwContent{
                width: 1676px;
                height: 254px;
                position: relative;
                padding-top: 42px;
                padding-left: 342px;
                .publictextStyle{
                  font-size: 34px;
                  .sum{
                    margin-top: 36px; 
                    .blue{
                      font-size:58px;
                    }
                  }
                }
                .defeatarrow{
                  width: 104px;
                  height: 256px;
                  background: url('../../assets/img/fillingleftarrow.png') no-repeat;
                  background-size: contain;
                  line-height: 256px;
                  top: 0;
                  left: -100px;
                }
              }
              .notPaddingleft{
                padding-left: 0;  
                display: flex;
                padding-bottom: 36px;
              }
              // .defeatPool{

              // }
              
              // .allDeal{
              //   width: 50%;
              //   border-right: .04px solid #1C748B;
              //   padding-left: 2.22px;
              // }

              .allDealright{
                width: 50%;
                padding-left: 178px;
              } 

              // .toShop{
              //   width: 50%;
              //   border-right: .04px solid #1C748B;
              //   padding-left: 2.14px;
              //   margin-top: .34px;
              // }

              .toShopRight{
                width: 50%;
                padding-left: 198px;
                margin-top: 34px;
              }

              .defeatpoolData{
                display: flex;
                // height: 100%;
                position: relative;

                  .defeatpoolIcon{
                      width: 56px;
                      height: 44px;
                      position: absolute;
                      background: url('../../assets/img/uesrs.png') no-repeat;
                      background-size: cover;
                      top: -25px;
                      right: 40px;
                      cursor:pointer;
                  }

                  .defeatpoolEchart{
                    width: 300px;
                    height: 167px;
                    margin-left: 240px;
                  }
              }

              .alldealValue{
                display: flex;

                  .alldealCycle{
                    margin-left: 70px ;
                    .alldealpublc{
                      height: 34px;
                      line-height: 34px;
                      margin-bottom: 4px;
                    }

                    .rwalldealColor{
                      color: #09C6CA;
                    }
                  }
              }
            }

           .publicDealStyle{
             // margin: auto;
             // text-align: center;
              .market-shares{
                position: absolute;
                bottom: 0;
                top: 0;
                margin: auto;
                width: 220px;
                height: 80px;
                font-size: 28px;
                background: #236bb4;
                border-radius: 16px;
                border: 3px solid #3a4263;
                left: 73px;                 
              }
              .dealTb{
                display: flex;
                height: 34px;
                line-height: 34px;
                margin-bottom: 18px;
                margin-left: 308px;
                font-size: 29px;
                .dealtims{
                  display: flex;
                  margin-left: 48px;
                }
                .average{
                  margin-left: 48px;
                  span:first-child{
                    color:$color-white-opacity;
                  }
                }
              }
              .dealTb:nth-of-type(2){
                margin-top: 20px;
              }
             .average{
               height: 34px;
               line-height: 34px;

                  .tian{
                    margin-left: 28px;
                    color: #fff;
                  }
                  .white {
                    color: #fff;
                  }
               }
           }
            // 箭头
          .diversion{
            width: 104px;
            height: 256px;
            background: url('../../assets/img/rightarrow.png') no-repeat;
            top: 337px;
            left: 444px;
            text-indent: -12px;
            line-height: 256px;
          }

          .sem{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/onearrow.png') no-repeat;
            top: 161px;
            left: 721px;
            // line-height: 1.04px;
            padding-top: 10px;
          }

          .drop{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/onearrow.png') no-repeat;
            line-height: 104px;
            top: 184px;
            left: 1794px;

          }

          .registered{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/onearrow.png') no-repeat;
            line-height: 104px;
            top: 660px;
            left: 594px;
          }

          .keep{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/onearrow.png') no-repeat;
            padding-top: 25px;
            top: 702px;
            left: 1592px;
          }

          // .keep1{
          //   width: 256px;
          //   height: 104px;
          //   background: url('../../assets/img/onearrow.png') no-repeat;
          //   line-height: 104px;
          //   top: 663px;
          //   left:1322px ;
          // }

          // .keep2{
          //   width: 256px;
          //   height: 104px;
          //   background: url('../../assets/img/onearrow.png') no-repeat;
          //   line-height: 104px;
          //   top: 660px;
          //   left: 1974px;
          // }

          // .keep3{
          //   width: 256px;
          //   height: 104px;
          //   background: url('../../assets/img/onearrow.png') no-repeat;
          //   line-height: 104px;
          //   top: 660px;
          //   left: 2890px;
          // }

          .defeated{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/fillingarrow.png');
            top: 880px;
            left: 236px;
            padding-top: 10px;
          }

          .nurtureArrow{
             width: 256px;
            height: 104px;
            line-height: 104px;
            background: url('../../assets/img/toparrow.png');
            top: 880px;
            left: 700px;
          }

          .nurtureLeft{
            left: 1184px;
          }

          .notR{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/onearrow.png');
            top:880px;
            left: 1632px;
            padding-top: 10px;
          }

          .Raera{
            width: 256px;
            height: 104px;
            background: url('../../assets/img/onearrow.png');
            top: 880px;
            left: 2796px;
            padding-top: 10px;

          }

          .transform1{
            width: 256px;
            height: 104px;
            line-height: 104px;
            background: url('../../assets/img/onearrow.png');
            top: 1240px;
            left: 1632px;
          }

          .transform2{
            width: 256px;
            height: 104px;
            line-height: 104px;
            background: url('../../assets/img/onearrow.png');
            top: 1240px;
            left: 2796px;
          }

          .rwarrow{
            width: 256px;
            height: 104px;
            // line-height: 1.04px;
            background: url('../../assets/img/onearrow.png');
            padding-top: 25px;
            top: 971px;
            left: 2504px;
          }

          .rwTransform{
            width: 256px;
            height: 104px;
            padding-top: 25px;
            background: url('../../assets/img/onearrow.png');
            // top: 74%;
            top: 1322px;
            left: 2504px;
          }

          .rwTransform1{
            width: 104px;
            height: 256px;
            line-height: 256px;
            background: url('../../assets/img/leftarrow.png');
            // top: 80%;
            top: 1419px;
            left: 1664px;
          }

          .arrowPublic{
            position: absolute;
            background-size: cover;
            font-size: 24px;
            color:rgba(248,249,249,0.6);
            text-align: center;
            cursor:pointer;
          }

          .blue{
            font-size: 58px;
            font-weight:500;
            color:#fff;
            margin-right: 8px;
          }

          .publicMarginRight{
            color:$color-white-opacity;
            margin-right: 16px;
          }

          .publicMarginLeft{
            margin-left: 4px;
          }

          .publicPaddingright{
            color:$color-white-opacity;
            padding-right: 28px;
          }

          .tbhb-width{
            width: 160px;
            display: block;
          }
          .green{
            color:#35E967
          }

          .red{
            color: #E80404;
           }

          .publictextStyle{
            height: 40px;
            font-size:34px;
            // font-family:PingFangSC-Regular,PingFang SC;
            font-weight:400;
            color:rgba(248,249,249,1);
            line-height:40px;
            margin-bottom: 4px;
          }

            .publicEchartStyle{
              width: 300px;
              height: 160px;
              position: absolute;
              left: 385px;
              margin-top: 73px;
            }
          }
        }
      }

      .defeatedEcharts{
        width: 100%;
        height: 1648px;
        // background-color:pink;

          .echartsTitle{
            height: 56px;
            line-height: 56px;
            font-size: 40px;
            color: #ffffff;
            margin-top: 48px;
            margin-left: 251px;
            margin-bottom: 50px;
          }

          .defeatedContent{
            width: 100%;
            height: calc(100% - 194px);
            color: #ffffff;
            padding-left: 75px;
            display: flex;
            .defeatedContentEcharts{
              width: calc(100% - 200px);
              height: 100%;
            }
            .defeat-num-list{
              height: 98.5%;
              margin-left: -50px;
              display: flex;
              flex-direction: column;
              font-size: 24px;
              justify-content: space-around;
              color: #ffffff;
            }
            // background-color: #fff;
          }

          .defeatedTotal{
            width: 100%;
            height: 44px;
            line-height: 44px;
            font-size: 32px;
            color: #236BB4 ;
            text-align: right;
            padding-right: 78px;
          }
      }
      
      .ntmodalContent{
        width: 100%;
        height: 1692px;

          .ntmodalDistributed{
            width: 100%;
            height: 676px;
            // background-color: pink;
            margin-top: 40px;
            display: flex;

             .cycle{
                width: 2050px;
                height: 100%;
                background-color: #021722;
                margin-right: 20px;

                  .cycleTitle{
                     width: 100%;
                     height: 100px;
                     border-bottom: 2px solid #0B4D5E;
                     line-height: 100px;
                     color: #FFFFFF;
                     font-size: 36px;
                     padding-left: 40px;
                  }
              
                 .ntmodalEcharts{
                   width: 100%;
                   height: calc(100% - 100px);
                  //  background-color: #fff;
                 }
             }
             .distributed{
               flex: 1;
               height: 100%;
               background-color: #021722;

                  .distributedTitle{
                    width: 100%;
                    height: 100px;
                    border-bottom: 2px solid #0B4D5E;
                    line-height: 100px;
                     color: #FFFFFF;
                     font-size: 36px;
                     padding-left: 40px;
                  }

                  .distributedEcharts{
                    width: 100%;
                    height: calc(100% - 100px);

                  }
             }
          }

          .ntmodalPortrait{
            width: 100%;
            height: 916px;
            background-color: #021722;
            margin-top: 20px;
          }
      }
      //element-ui的样式
      .el-dialog{
        background-color: $box-bg-primary;
        color: #ffffff;
        border-radius: 12px;
         .el-dialog__header {
           padding: 32px 0px 22px 44px;
           color: #ffffff; 
           border-bottom: 2px solid $color-border-primary;

            .el-dialog__title {
              font-size: 36px;
              color: #ffffff;
            }

            .el-dialog__headerbtn .el-dialog__close{
              color: #ffffff;
              font-size: 34px;
            }

         } 

         .el-dialog__body{
           padding: 0 40px;
           color: #ffffff;
         }

      }
  .enlarge{
    font-size: 32px;
    font-weight: 700;
  }

    }
</style>
