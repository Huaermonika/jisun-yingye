<template>
  <div class="panel">
    <div class="panel-head">
      <span class="panel-title">身体锁定</span>
      <span class="panel-tag">LOCK</span>
    </div>
    <p class="panel-desc">锁定对应部位，千鹤将无法移动该部位</p>

    <div class="lock-grid">
      <button
        v-for="part in parts"
        :key="part.id"
        class="lock-btn"
        :class="{ locked: isLocked(part.id) }"
        type="button"
        @click="toggleLock(part.id)"
      >
        <span class="lock-dot"></span>
        <span class="lock-name">{{ part.label }}</span>
        <span class="lock-state">{{ isLocked(part.id) ? '已锁定' : '未锁定' }}</span>
      </button>
    </div>

    <div class="divider"></div>

    <div class="panel-head">
      <span class="panel-title">实际着装</span>
      <span class="panel-tag">OUTFIT</span>
    </div>
    <div class="outfit-list">
      <div v-for="(desc, slot) in store.data.千鹤.实际着装" :key="slot" class="outfit-item">
        <span class="outfit-slot">{{ slot }}</span>
        <span class="outfit-desc">{{ desc }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useDataStore } from '../store';

const store = useDataStore();

const parts = [
  { id: '双手', label: '双手' },
  { id: '双脚', label: '双脚' },
  { id: '腰部', label: '腰部' },
  { id: '脖颈', label: '脖颈' },
];

function isLocked(part: string): boolean {
  return !!store.data.千鹤.身体锁定[part];
}

function toggleLock(part: string) {
  store.data.千鹤.身体锁定[part] = !isLocked(part);
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

.lock-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.lock-btn {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  cursor: pointer;
  transition: all 0.2s;
  font-family: inherit;
}

.lock-btn:hover {
  border-color: var(--line-2);
}

.lock-btn.locked {
  border-color: var(--red);
  background: rgba(255, 92, 122, 0.08);
}

.lock-dot {
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: var(--green);
  flex-shrink: 0;
}

.lock-btn.locked .lock-dot {
  background: var(--red);
  box-shadow: 0 0 6px var(--red);
}

.lock-name {
  font-size: 13px;
  font-weight: 700;
  flex: 1;
  text-align: left;
}

.lock-state {
  font-size: 11px;
  color: var(--muted);
  font-family: var(--font-mono);
}

.lock-btn.locked .lock-state {
  color: var(--red);
}

.divider {
  height: 1px;
  background: var(--line);
  margin: 6px 0;
}

.outfit-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.outfit-item {
  display: flex;
  align-items: baseline;
  gap: 10px;
  padding: 8px 10px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 8px;
}

.outfit-slot {
  font-size: 11px;
  color: var(--accent);
  font-weight: 700;
  flex-shrink: 0;
  min-width: 28px;
}

.outfit-desc {
  font-size: 12px;
  color: var(--text);
}
</style>
