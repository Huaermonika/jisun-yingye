export const Schema = z.object({
  世界: z.object({
    当前时间: z.string(),
    当前地点: z.string(),
  }),

  千鹤: z.object({
    意识状态: z.enum(['运行中', '已停止', '已冻结']),
    身体锁定: z.record(z.string().describe('部位'), z.boolean().describe('是否锁定')),
    认知状态: z.string(),
    敏感度: z.coerce.number().transform(v => _.clamp(v, 1, 100)),
    电量: z.coerce.number().transform(v => _.clamp(v, 0, 100)),
    实际着装: z.record(z.enum(['上装', '下装', '内衣', '袜子', '鞋子', '饰品']), z.string().describe('服装描述')),
    记忆日志: z.record(z.string().describe('时间'), z.string().describe('事件')),
  }),
});
export type Schema = z.output<typeof Schema>;
