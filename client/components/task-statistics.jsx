"use client";
import { TrendingUp } from "lucide-react";
import { Label, PolarRadiusAxis, RadialBar, RadialBarChart } from "recharts";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import { tasksAPI } from "@/utils/api";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A radial chart with stacked sections";

const chartConfig = {
  desktop: {
    label: "Completed",
    color: "#A020F0",
  },
  mobile: {
    label: "Pending",
    color: "#D8F020",
  },
};

export default function TaskStatistics() {
  const [tasks, setTasks] = useState([]);
  const [stats, setStats] = useState({
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0, // Add a count for pending tasks
    tasksDueSoon: 0,
  });

  const updateStats = (tasks) => {
    const totalTasks = tasks.length;
    const completedTasks = tasks.filter((task) => task.status === "completed").length;
    const pendingTasks = tasks.filter((task) => task.status === "pending").length;
    const tasksDueSoon = tasks.filter(
      (task) =>
        task.status === "pending" &&
        new Date(task.dueDate) <= new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
    ).length;
  
    setStats({
      totalTasks,
      completedTasks,
      pendingTasks,
      tasksDueSoon,
    });
  };
  

  useEffect(() => {
    // Fetch tasks and update stats on initial load
    const fetchTasks = async () => {
      try {
        const response = await tasksAPI.getTasks();
        if (response.data.status === "success") {
          setTasks(response.data.data.tasks);
          updateStats(response.data.data.tasks);
        }
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  // Update stats whenever tasks change
  useEffect(() => {
    updateStats(tasks);
  }, [tasks]);

  // Chart data based on the stats
  const chartData = [
    {
      completed: stats.completedTasks,
      pending: stats.pendingTasks,
    },
  ];

  return (
    <Card className="flex flex-col border-2 border-white shadow-none bg-[#EDEDED]">
      <CardHeader className="items-center pb-0">
        <CardTitle>Completed vs Pending Tasks</CardTitle>
        <CardDescription>Task completion status.</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 items-center pb-0">
        <ChartContainer
          config={chartConfig}
          className="mx-auto aspect-square w-full max-w-[250px]"
        >
          <RadialBarChart
            data={chartData}
            endAngle={180}
            innerRadius={80}
            outerRadius={130}
          >
            <ChartTooltip
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text x={viewBox.cx} y={viewBox.cy} textAnchor="middle">
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) - 16}
                          className="fill-foreground text-2xl font-bold"
                        >
                          {stats.totalTasks}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 4}
                          className="fill-muted-foreground"
                        >
                          Tasks
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </PolarRadiusAxis>
            <RadialBar
              dataKey="completed"
              stackId="a"
              cornerRadius={5}
              fill="var(--color-desktop)"
              className="stroke-transparent stroke-2"
            />
            <RadialBar
              dataKey="pending"
              fill="var(--color-mobile)"
              stackId="a"
              cornerRadius={5}
              className="stroke-transparent stroke-2"
            />
          </RadialBarChart>
        </ChartContainer>
      </CardContent>
      <CardFooter className="flex-col gap-2 text-sm">
        <div className="flex items-center gap-2 font-medium leading-none">
          Every small step takes you closer to your goals 🚀
        </div>
        <div className="leading-none text-muted-foreground">
          Keep pushing — your future self will thank you!
        </div>
      </CardFooter>
    </Card>
  );
}

