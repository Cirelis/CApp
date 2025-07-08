// ----------------------------------------------------------------------

export type IEvents = {
  views: number;
  rebuys: number;
  date: string;
};

export type EventData = {
  label: string;
  nb_visits: number;
  nb_events: number;
  nb_events_with_value: number;
  sum_event_value: number;
  min_event_value: number;
  max_event_value: number;
  sum_daily_nb_uniq_visitors: number;
  avg_event_value: number;
  Events_EventCategory: string;
  Events_EventAction: string;
}

export type IViewsPrev = {
  [date: string]: EventData[];
};

export type ISubwidget = {
  event_subwidget: string;
  event_value: number;
};

export type ISession = {
  event_widget: string;
  event_widget_time: number;
  event_subwidgets: ISubwidget[]
};

export type IAnalyticsData = {
  country: string;
  date: string;
  rebuyClicksTotal: number;
  visitCountsTotal: number;
  sessions: ISession[];
};

export type IAnalytics = {
  data: IAnalyticsData[];
};

