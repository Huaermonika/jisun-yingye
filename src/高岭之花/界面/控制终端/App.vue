<template>
  <div class="phone">
    <!-- 状态栏 -->
    <div class="phone-status">
      <span class="status-time">{{ timeText }}</span>
      <span class="status-model">AN-0170A</span>
      <span class="status-batt">{{ battBar }} {{ store.data.千鹤.电量 }}%</span>
    </div>

    <!-- 头部 -->
    <header class="phone-header">
      <div class="header-title">
        <span class="header-dot"></span>
        <div>
          <div class="header-name">白峰千鹤</div>
          <div class="header-sub">AN-0170A · 控制终端</div>
        </div>
      </div>
      <div class="header-state" :class="stateClass">{{ store.data.千鹤.意识状态 }}</div>
    </header>

    <!-- 内容区 -->
    <div class="phone-body">
      <div v-if="active_tab === '人格'" class="pane">
        <PersonaPanel />
      </div>
      <div v-else-if="active_tab === '身体'" class="pane">
        <BodyPanel />
      </div>
      <div v-else-if="active_tab === '认知'" class="pane">
        <CognitionPanel />
      </div>
      <div v-else-if="active_tab === '感官'" class="pane">
        <SensePanel />
      </div>
    </div>

    <!-- 底部导航 -->
    <nav class="phone-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        class="tab-btn"
        :class="{ active: active_tab === tab.id }"
        type="button"
        @click="active_tab = tab.id"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        <span class="tab-label">{{ tab.label }}</span>
      </button>
    </nav>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from './store';
import PersonaPanel from './components/PersonaPanel.vue';
import BodyPanel from './components/BodyPanel.vue';
import CognitionPanel from './components/CognitionPanel.vue';
import SensePanel from './components/SensePanel.vue';

const store = useDataStore();

const tabs = [
  { id: '人格', icon: '◉', label: '人格' },
  { id: '身体', icon: '✥', label: '身体' },
  { id: '认知', icon: '✎', label: '认知' },
  { id: '感官', icon: '≈', label: '感官' },
];

const active_tab = useLocalStorage<string>('control_terminal:active_tab', '人格');

const stateClass = computed(() => {
  const map: Record<string, string> = {
    运行中: 'is-running',
    已停止: 'is-stopped',
    已冻结: 'is-frozen',
  };
  return map[store.data.千鹤.意识状态] ?? '';
});

const timeText = computed(() => {
  const m = store.data.世界.当前时间.match(/(\d{2}:\d{2})/);
  return m ? m[1] : '--:--';
});

const battBar = computed(() => {
  const level = store.data.千鹤.电量;
  const filled = Math.round(level / 25);
  return '▮'.repeat(filled) + '▯'.repeat(4 - filled);
});
</script>

<style lang="scss" scoped>
.phone {
  width: 100%;
  max-width: 460px;
  margin: 0 auto;
  background: var(--bg);
  border: 1px solid var(--line-2);
  border-radius: 18px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  font-family: var(--font-ui);
}

/* 状态栏 */
.phone-status {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 6px 14px;
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  border-bottom: 1px solid var(--line);
  background: #0e121b;
}

.status-model {
  letter-spacing: 1px;
  color: var(--accent);
}

.status-batt {
  letter-spacing: 1px;
}

/* 头部 */
.phone-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 14px;
  background: linear-gradient(135deg, #141a28 0%, #10141f 100%);
  border-bottom: 1px solid var(--line);
}

.header-title {
  display: flex;
  align-items: center;
  gap: 10px;
}

.header-dot {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: var(--green);
  box-shadow: 0 0 8px var(--green);
}

.header-name {
  font-size: 16px;
  font-weight: 700;
  letter-spacing: 1px;
}

.header-sub {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
  letter-spacing: 0.5px;
}

.header-state {
  padding: 4px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 1px;
  border: 1px solid;

  &.is-running {
    color: var(--green);
    border-color: var(--green);
    background: rgba(87, 217, 123, 0.1);
  }

  &.is-stopped {
    color: var(--red);
    border-color: var(--red);
    background: rgba(255, 92, 122, 0.1);
  }

  &.is-frozen {
    color: var(--blue);
    border-color: var(--blue);
    background: rgba(90, 167, 255, 0.1);
  }
}

/* 内容区 */
.phone-body {
  padding: 14px;
  background: var(--panel);
}

.pane {
  animation: fade-in 0.3s ease;
}

@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(4px);
  }

  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* 底部导航 */
.phone-tabs {
  display: flex;
  border-top: 1px solid var(--line);
  background: #0e121b;
}

.tab-btn {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 2px;
  padding: 9px 0 8px;
  background: transparent;
  border: none;
  color: var(--muted);
  cursor: pointer;
  transition: color 0.2s;
  font-family: inherit;
}

.tab-btn:hover {
  color: var(--text);
}

.tab-btn.active {
  color: var(--accent);
}

.tab-icon {
  font-size: 14px;
  line-height: 1;
}

.tab-label {
  font-size: 11px;
  letter-spacing: 1px;
}
</style>
