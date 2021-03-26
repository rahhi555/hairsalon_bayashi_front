<template>
  <FullCalendar :options="calendarOptions" />
</template>
<script>
import FullCalendar from '@fullcalendar/vue'
import dayGridPlugin from '@fullcalendar/daygrid'
import interactionPlugin from '@fullcalendar/interaction'
import timeGridPlugin from '@fullcalendar/timegrid'
import listPlugin from '@fullcalendar/list'
import jaLocale from '@fullcalendar/core/locales/ja'

export default {
  components: {
    FullCalendar, // make the <FullCalendar> tag available
  },
  data() {
    return {
      calendarOptions: {
        // カレンダーで使用するプラグイン
        plugins: [dayGridPlugin, interactionPlugin, timeGridPlugin, listPlugin],
        // 一番最初に表示する形式
        initialView: 'dayGridMonth',
        // 日本語化
        locale: jaLocale,
        // ヘッダーの構成
        headerToolbar: {
          start: 'today prev,next',
          center: 'title',
          end: 'dayGridMonth timeGridWeek timeGridDay listMonth',
        },
        // カレンダーに表示されるイベント
        events: [],
        selectable: true,
        dateClick: this.dateClick,
      },
    }
  },
  async mounted() {
    const appointments = await this.$axios.$get('/api/v1/appointments')
    const events = []
    for (const apo of appointments.union_appointments) {
      const event = {
        id: 0,
        title: '',
        start: '',
        end: '',
      }
      event.id = apo.appointment.id
      event.title = apo.appointment.stylist_name
      event.start = apo.start_end_time[0]?.start_time
      event.end = apo.start_end_time[0]?.finish_time
      events.push(event)
    }
    this.calendarOptions.events = events
    return {}
  },
  methods: {
    dateClick() {
      console.log('click')
    },
  },
}
</script>
