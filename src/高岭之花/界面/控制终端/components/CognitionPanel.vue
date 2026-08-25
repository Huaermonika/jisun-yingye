<template>
  <div class="panel">
    <div class="panel-head">
      <span class="panel-title">认知模块</span>
      <span class="panel-tag">COGNITION</span>
    </div>
    <p class="panel-desc">篡改千鹤对现实的认知</p>

    <textarea
      v-model="draft"
      class="cog-input"
      rows="3"
      placeholder="输入新的认知描述，例如：她以为自己还穿着衣服、以为自己还在教室里……"
    ></textarea>
    <div class="cog-actions">
      <button class="btn primary" type="button" @click="apply">写入认知</button>
      <button class="btn ghost" type="button" @click="reset">恢复正常</button>
    </div>
    <div class="cog-current">
      <span class="cog-label">当前认知</span>
      <span class="cog-text">{{ store.data.千鹤.认知状态 }}</span>
    </div>

    <div class="divider"></div>

    <div class="panel-head">
      <span class="panel-title">记忆日志</span>
      <span class="panel-tag">MEMORY</span>
    </div>
    <div v-if="!_.isEmpty(store.data.千鹤.记忆日志)" class="memory-list">
      <div v-for="(event, time) in store.data.千鹤.记忆日志" :key="time" class="memory-item">
        <span class="memory-time">{{ time }}</span>
        <span class="memory-event">{{ event }}</span>
        <button class="memory-del" type="button" title="删除这条记忆" @click="removeMemory(time)">✕</button>
      </div>
    </div>
    <div v-else class="memory-empty">记忆日志为空</div>
    <button
      v-if="!_.isEmpty(store.data.千鹤.记忆日志)"
      class="btn danger"
      type="button"
      @click="clearMemory"
    >
      清空全部记忆
    </button>
  </div>
</template>

<script setup lang="ts">
import _ from 'lodash';
import { useDataStore } from '../store';

const store = useDataStore();

const draft = ref('');

function apply() {
  if (!draft.value.trim()) return;
  store.data.千鹤.认知状态 = draft.value.trim();
  draft.value = '';
}

function reset() {
  store.data.千鹤.认知状态 = '认知正常，清楚自己当前身处的处境';
}

function removeMemory(time: string) {
  delete store.data.千鹤.记忆日志[time];
}

function clearMemory() {
  store.data.千鹤.记忆日志 = {};
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

.cog-input {
  width: 100%;
  padding: 10px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 10px;
  color: var(--text);
  font-family: var(--font-ui);
  font-size: 13px;
  resize: vertical;
}

.cog-input::placeholder {
  color: var(--muted);
}

.cog-actions {
  display: flex;
  gap: 8px;
}

.btn {
  padding: 8px 14px;
  border-radius: 8px;
  font-size: 12px;
  font-weight: 700;
  cursor: pointer;
  border: 1px solid transparent;
  font-family: inherit;
  transition: all 0.2s;
}

.btn.primary {
  background: var(--accent);
  color: #08121a;
}

.btn.primary:hover {
  filter: brightness(1.1);
}

.btn.ghost {
  background: transparent;
  border-color: var(--line-2);
  color: var(--muted);
}

.btn.ghost:hover {
  color: var(--text);
  border-color: var(--muted);
}

.btn.danger {
  background: transparent;
  border-color: var(--red);
  color: var(--red);
}

.btn.danger:hover {
  background: rgba(255, 92, 122, 0.1);
}

.cog-current {
  display: flex;
  flex-direction: column;
  gap: 4px;
  padding: 10px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 8px;
}

.cog-label {
  font-size: 11px;
  color: var(--accent);
  font-weight: 700;
}

.cog-text {
  font-size: 12px;
  color: var(--text);
}

.divider {
  height: 1px;
  background: var(--line);
  margin: 6px 0;
}

.memory-list {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.memory-item {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 10px;
  background: var(--panel-2);
  border: 1px solid var(--line);
  border-radius: 8px;
}

.memory-time {
  font-family: var(--font-mono);
  font-size: 11px;
  color: var(--muted);
  flex-shrink: 0;
}

.memory-event {
  font-size: 12px;
  color: var(--text);
  flex: 1;
}

.memory-del {
  width: 20px;
  height: 20px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: transparent;
  border: 1px solid var(--line-2);
  border-radius: 5px;
  color: var(--muted);
  cursor: pointer;
  font-size: 11px;
  transition: all 0.2s;
}

.memory-del:hover {
  color: var(--red);
  border-color: var(--red);
}

.memory-empty {
  text-align: center;
  color: var(--muted);
  font-size: 12px;
  padding: 16px;
  border: 1px dashed var(--line);
  border-radius: 8px;
}
</style>
