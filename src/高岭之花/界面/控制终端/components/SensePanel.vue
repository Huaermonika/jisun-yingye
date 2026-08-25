<template>
  <div class="panel">
    <div class="panel-head">
      <span class="panel-title">感官模块</span>
      <span class="panel-tag">SENSITIVITY</span>
    </div>
    <p class="panel-desc">调节千鹤的身体感官灵敏度</p>

    <div class="sense-value">
      <span class="sense-number">{{ store.data.千鹤.敏感度 }}</span>
      <span class="sense-level" :class="levelClass">{{ levelLabel }}</span>
    </div>

    <input
      v-model.number="store.data.千鹤.敏感度"
      class="sense-slider"
      type="range"
      min="1"
      max="100"
      step="1"
    />

    <div class="sense-scale">
      <span>1</span>
      <span>25</span>
      <span>50</span>
      <span>75</span>
      <span>100</span>
    </div>

    <div class="sense-tip">
      <span class="tip-dot"></span>
      数值越高，身体对外界触碰的触觉反馈越强烈
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const levelLabel = computed(() => {
  const v = store.data.千鹤.敏感度;
  if (v <= 20) return '迟钝';
  if (v <= 40) return '正常';
  if (v <= 60) return '敏感';
  if (v <= 80) return '高敏';
  return '过载';
});

const levelClass = computed(() => {
  const v = store.data.千鹤.敏感度;
  if (v <= 20) return 'lv-low';
  if (v <= 40) return 'lv-mid';
  if (v <= 60) return 'lv-high';
  return 'lv-max';
});
</script>

<style lang="scss" scoped>
.panel {
  display: flex;
  flex-direction: column;
  gap: 12px;
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
  margin-top: -6px;
}

.sense-value {
  display: flex;
  align-items: baseline;
  justify-content: space-between;
}

.sense-number {
  font-family: var(--font-mono);
  font-size: 32px;
  font-weight: 700;
  color: var(--accent);
  line-height: 1;
}

.sense-level {
  padding: 3px 12px;
  border-radius: 999px;
  font-size: 12px;
  font-weight: 700;
  border: 1px solid;

  &.lv-low {
    color: var(--green);
    border-color: var(--green);
  }

  &.lv-mid {
    color: var(--amber);
    border-color: var(--amber);
  }

  &.lv-high {
    color: var(--blue);
    border-color: var(--blue);
  }

  &.lv-max {
    color: var(--red);
    border-color: var(--red);
  }
}

.sense-slider {
  width: 100%;
  height: 6px;
  -webkit-appearance: none;
  appearance: none;
  background: var(--panel-2);
  border-radius: 3px;
  outline: none;
}

.sense-slider::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg);
  cursor: pointer;
  box-shadow: 0 0 8px rgba(63, 214, 196, 0.6);
}

.sense-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: var(--accent);
  border: 2px solid var(--bg);
  cursor: pointer;
}

.sense-scale {
  display: flex;
  justify-content: space-between;
  font-family: var(--font-mono);
  font-size: 10px;
  color: var(--muted);
  margin-top: -8px;
}

.sense-tip {
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 11px;
  color: var(--muted);
}

.tip-dot {
  width: 6px;
  height: 6px;
  border-radius: 50%;
  background: var(--accent);
  flex-shrink: 0;
}
</style>
