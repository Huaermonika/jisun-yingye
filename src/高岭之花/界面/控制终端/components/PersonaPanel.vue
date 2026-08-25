<template>
  <div class="panel">
    <div class="panel-head">
      <span class="panel-title">人格模块</span>
      <span class="panel-tag">PERSONA</span>
    </div>
    <p class="panel-desc">控制千鹤的人格程序运行状态</p>

    <div class="state-list">
      <button
        v-for="s in states"
        :key="s.id"
        class="state-btn"
        :class="[s.id, { active: store.data.千鹤.意识状态 === s.id }]"
        type="button"
        @click="setState(s.id)"
      >
        <span class="state-icon">{{ s.icon }}</span>
        <span class="state-text">
          <span class="state-label">{{ s.label }}</span>
          <span class="state-desc">{{ s.desc }}</span>
        </span>
      </button>
    </div>

    <div class="divider"></div>

    <div class="panel-head">
      <span class="panel-title">电源</span>
      <span class="panel-tag">POWER</span>
    </div>
    <div class="battery">
      <div class="battery-track">
        <div
          class="battery-fill"
          :class="{ low: store.data.千鹤.电量 <= 20 }"
          :style="{ width: store.data.千鹤.电量 + '%' }"
        ></div>
      </div>
      <span class="battery-value">{{ store.data.千鹤.电量 }}%</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const states = [
  { id: '运行中', label: '运行中', icon: '▶', desc: '人格程序正常运行' },
  { id: '已停止', label: '已停止', icon: '■', desc: '人格程序终止，只执行指令' },
  { id: '已冻结', label: '已冻结', icon: '❄', desc: '动作与表情定格' },
];

function setState(id: string) {
  store.data.千鹤.意识状态 = id as '运行中' | '已停止' | '已冻结';
}
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.panel-head {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.panel-title {
  font-size: 13px;
  font-weight: 700;
  letter-spacing: 1px;
  color: var(--text);
}

.panel-tag {
  font-family: var(--font-mono);
  font-size: 10px;
  letter-spacing: 2px;
  color: var(--muted);
}

.panel-desc {
  font-size: 12px;
  color: var(--muted);
  margin-top: -4px;
}

.state-list {
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.state-btn {
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  text-align: left;
  font-family: inherit;
}

.state-btn:hover {
  border-color: var(--line-2);
}

.state-btn.active {
  border-color: var(--accent);
  background: var(--accent-dim);
}

.state-icon {
  width: 34px;
  height: 34px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 8px;
  font-size: 15px;
}

.state-btn.运行中 .state-icon {
  background: rgba(87, 217, 123, 0.15);
  color: var(--green);
}

.state-btn.已停止 .state-icon {
  background: rgba(255, 92, 122, 0.15);
  color: var(--red);
}

.state-btn.已冻结 .state-icon {
  background: rgba(90, 167, 255, 0.15);
  color: var(--blue);
}

.state-text {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.state-label {
  font-size: 13px;
  font-weight: 700;
}

.state-desc {
  font-size: 11px;
  color: var(--muted);
}

.divider {
  height: 1px;
  background: var(--line);
  margin: 6px 0;
}

.battery {
  display: flex;
  align-items: center;
  gap: 10px;
}

.battery-track {
  flex: 1;
  height: 12px;
  border: 1px solid var(--line-2);
  border-radius: 6px;
  background: var(--panel-2);
  overflow: hidden;
}

.battery-fill {
  height: 100%;
  background: linear-gradient(90deg, var(--green), var(--accent));
  transition: width 0.3s ease;

  &.low {
    background: linear-gradient(90deg, var(--red), var(--amber));
  }
}

.battery-value {
  font-family: var(--font-mono);
  font-size: 13px;
  font-weight: 700;
  min-width: 44px;
  text-align: right;
}
</style>
