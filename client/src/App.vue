<template>
  <div>
    <h1>Нагрузочный тест GET /items</h1>

    <div style="margin-bottom: 16px;">
      <input v-model.number="requestsCount" placeholder="Количество запросов" />
      <input v-model.number="delayMs" placeholder="Задержка (мс)" />
      <button @click="startTest" :disabled="running">Старт нагрузочного теста</button>
      <button @click="clearResults" :disabled="running" style="margin-left: 8px;">Очистить</button>
    </div>

    <div>
      <p>Отправлено: {{ sent }}</p>
      <p>Успешно: {{ success }}</p>
      <p>Ошибки: {{ error }}</p>
      <p>Время: {{ elapsed }} мс</p>
    </div>

    <h2>Результаты каждого запроса</h2>
    <table v-if="results.length" border="1" cellpadding="4">
      <thead>
      <tr>
        <th>#</th>
        <th>Статус</th>
        <th>Время выполнения (мс)</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(r, index) in results" :key="index">
        <td>{{ index + 1 }}</td>
        <td>{{ r.status }}</td>
        <td>{{ r.time }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import axios from 'axios';

const requestsCount = ref(10);
const delayMs = ref(100);

const sent = ref(0);
const success = ref(0);
const error = ref(0);
const running = ref(false);
const startTime = ref(0);
const elapsed = ref(0);

const results = ref<{ status: string; time: number }[]>([]);

setInterval(() => {
  if (running.value) {
    elapsed.value = Date.now() - startTime.value;
  }
}, 100);

async function startTest() {
  sent.value = success.value = error.value = 0;
  results.value = [];
  running.value = true;
  startTime.value = Date.now();

  for (let i = 0; i < requestsCount.value; i++) {
    const requestStart = Date.now();
    sent.value++;
    try {
      await axios.get('http://localhost:3000/items?limit=10&offset=0');
      success.value++;
      results.value.push({
        status: 'Успешно',
        time: Date.now() - requestStart,
      });
    } catch {
      error.value++;
      results.value.push({
        status: 'Ошибка',
        time: Date.now() - requestStart,
      });
    }

    await new Promise(r => setTimeout(r, delayMs.value));
  }

  running.value = false;
}

function clearResults() {
  results.value = [];
  sent.value = success.value = error.value = elapsed.value = 0;
}
</script>
