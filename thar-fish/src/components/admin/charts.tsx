"use client";

import {
  Area,
  AreaChart,
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const COLORS = [
  "var(--chart-1)",
  "var(--chart-2)",
  "var(--chart-3)",
  "var(--chart-4)",
  "var(--chart-5)",
  "var(--gold)",
];

const axisProps = {
  stroke: "var(--muted-foreground)",
  fontSize: 12,
  tickLine: false,
  axisLine: false,
};

const tooltipStyle = {
  contentStyle: {
    background: "var(--popover)",
    border: "1px solid var(--border)",
    borderRadius: 12,
    fontSize: 12,
    color: "var(--popover-foreground)",
  },
} as const;

function ChartCard({
  title,
  children,
  action,
}: {
  title: string;
  children: React.ReactNode;
  action?: React.ReactNode;
}) {
  return (
    <Card>
      <CardHeader className="flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base">{title}</CardTitle>
        {action}
      </CardHeader>
      <CardContent className="pt-2">
        <div className="h-72 w-full">
          <ResponsiveContainer width="100%" height="100%">
            {children as React.ReactElement}
          </ResponsiveContainer>
        </div>
      </CardContent>
    </Card>
  );
}

export function RevenueChart({
  data,
}: {
  data: { month: string; revenue: number; expenses: number }[];
}) {
  return (
    <ChartCard title="Monthly Revenue vs Expenses">
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="rev" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0} />
          </linearGradient>
          <linearGradient id="exp" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-5)" stopOpacity={0.4} />
            <stop offset="95%" stopColor="var(--chart-5)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} tickFormatter={(v) => `₹${v / 100000}L`} />
        <Tooltip
          {...tooltipStyle}
          formatter={(v) => `₹${Number(v).toLocaleString("en-IN")}`}
        />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Area
          type="monotone"
          dataKey="revenue"
          name="Revenue"
          stroke="var(--chart-1)"
          fill="url(#rev)"
          strokeWidth={2.5}
        />
        <Area
          type="monotone"
          dataKey="expenses"
          name="Expenses"
          stroke="var(--chart-5)"
          fill="url(#exp)"
          strokeWidth={2.5}
        />
      </AreaChart>
    </ChartCard>
  );
}

export function FishSalesChart({
  data,
}: {
  data: { month: string; Rohu: number; Katla: number; Tilapia: number }[];
}) {
  return (
    <ChartCard title="Fish Sales Trend (tonnes)">
      <LineChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
        <Line type="monotone" dataKey="Rohu" stroke="var(--chart-1)" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="Katla" stroke="var(--chart-2)" strokeWidth={2.5} dot={false} />
        <Line type="monotone" dataKey="Tilapia" stroke="var(--chart-3)" strokeWidth={2.5} dot={false} />
      </LineChart>
    </ChartCard>
  );
}

export function CustomerGrowthChart({
  data,
}: {
  data: { month: string; customers: number }[];
}) {
  return (
    <ChartCard title="Customer Growth">
      <AreaChart data={data} margin={{ left: -10, right: 8, top: 8 }}>
        <defs>
          <linearGradient id="cust" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="var(--chart-2)" stopOpacity={0.5} />
            <stop offset="95%" stopColor="var(--chart-2)" stopOpacity={0} />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} />
        <Area
          type="monotone"
          dataKey="customers"
          name="Customers"
          stroke="var(--chart-2)"
          fill="url(#cust)"
          strokeWidth={2.5}
        />
      </AreaChart>
    </ChartCard>
  );
}

export function BookingTrendChart({
  data,
}: {
  data: { month: string; bookings: number }[];
}) {
  return (
    <ChartCard title="Resort Booking Trend">
      <BarChart data={data} margin={{ left: -16, right: 8, top: 8 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" vertical={false} />
        <XAxis dataKey="month" {...axisProps} />
        <YAxis {...axisProps} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="bookings" name="Bookings" radius={[6, 6, 0, 0]} fill="var(--chart-4)" />
      </BarChart>
    </ChartCard>
  );
}

export function PopularSpeciesChart({
  data,
}: {
  data: { name: string; value: number }[];
}) {
  return (
    <ChartCard title="Popular Fish Species">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          innerRadius={55}
          outerRadius={90}
          paddingAngle={3}
        >
          {data.map((_, i) => (
            <Cell key={i} fill={COLORS[i % COLORS.length]} />
          ))}
        </Pie>
        <Tooltip {...tooltipStyle} formatter={(v) => `${Number(v)}%`} />
        <Legend iconType="circle" wrapperStyle={{ fontSize: 12 }} />
      </PieChart>
    </ChartCard>
  );
}

export function ServiceEnquiriesChart({
  data,
}: {
  data: { name: string; enquiries: number }[];
}) {
  return (
    <ChartCard title="Service Enquiries">
      <BarChart
        data={data}
        layout="vertical"
        margin={{ left: 24, right: 16, top: 8 }}
      >
        <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" horizontal={false} />
        <XAxis type="number" {...axisProps} />
        <YAxis type="category" dataKey="name" {...axisProps} width={110} />
        <Tooltip {...tooltipStyle} cursor={{ fill: "var(--muted)" }} />
        <Bar dataKey="enquiries" name="Enquiries" radius={[0, 6, 6, 0]} fill="var(--chart-3)" />
      </BarChart>
    </ChartCard>
  );
}
