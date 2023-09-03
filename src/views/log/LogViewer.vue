<template>
  <div class="log-viewer">
    <template>
      <el-table
          :data="logs"
          border
          style="width: 100%">
        <el-table-column
            fixed
            prop="userName"
            label="用户名"
            width="100">
        </el-table-column>
        <el-table-column
            prop="operation"
            label="操作"
            width="120">
        </el-table-column>
        <el-table-column
            prop="httpMethod"
            label="请求方法"
            width="120">
        </el-table-column>
        <el-table-column
            prop="httpUrl"
            label="请求地址"
            width="200">
        </el-table-column>
        <el-table-column
            prop="param"
            label="请求参数"
            width="300">
        </el-table-column>
        <el-table-column
            prop="ip"
            label="IP地址"
            width="100">
        </el-table-column>
        <el-table-column
            prop="createTime"
            label="请求时间"
            width="100">
        </el-table-column>
        <el-table-column
            fixed="right"
            label="操作"
            width="100">
          <template slot-scope="scope">
            <el-button type="text" size="small">查看</el-button>
            <el-button type="text" size="small">编辑</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-pagination
          style="text-align: center"
          background
          layout="prev, pager, next"
          @size-change="this.handleSizeChange"
          @current-change="this.handleCurrentChange"
          :current-page="pageNum"
          :page-size="pageSize"
          :page-sizes="[2,5,10,20]"
          :total=total>
      </el-pagination>
    </template>

  </div>
</template>

<script>
import axios from 'axios';
import request from "@/utils/request";

export default {
  name: 'LogViewer',
  data() {
    return {
      logs: [],
      // 存储日志信息的数组
      pageSize: 5,
      pageNum: 1,
      total: 0,
    };
  },
  mounted() {
    // 在组件加载时获取日志信息
    this.fetchLogs();
  },
  methods: {
    fetchLogs() {
      request.get(`/weblogs/?pageNum=${this.pageNum}&pageSize=${this.pageSize}`).then(res => {
        this.logs = res.data.list;
        for(let i = 0;i < this.logs.length;i++){
          this.logs.at(i).createTime = this.formatDate(this.logs.at(i).createTime)
        }
        this.total = res.data.total
      })
    },
    handleSizeChange(pageSize){
      this.pageSize = pageSize
      this.fetchLogs()
    },
    handleCurrentChange(pageNum){
      this.pageNum = pageNum;
      this.fetchLogs()
    },
    formatDate(dateString) {
      const date = new Date(dateString);
      return `${date.getFullYear()}-${this.padZero(date.getMonth() + 1)}-${this.padZero(date.getDate())} ${this.padZero(date.getHours())}:${this.padZero(date.getMinutes())}:${this.padZero(date.getSeconds())}`;
    },
    padZero(num) {
      return num < 10 ? "0" + num : num;
    },
  }
};
</script>

<style scoped>
.log-viewer {
  margin: 20px;
}

.log {
  border: 1px solid #ccc;
  padding: 10px;
  margin-bottom: 10px;
}

.log-viewer{
  border: 1px solid #1d1b1b; /* 设置边框样式 */
  padding: 20px; /* 可选，设置边距 */
}
.el-table {
  border: 1px solid #ccc; /* 设置表格边框样式 */
}
</style>
