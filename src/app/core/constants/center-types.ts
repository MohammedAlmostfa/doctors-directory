export const CENTER_TYPES = ['مشفى', 'مركز طبي', 'مجمع عيادات', 'مركز أشعة'] as const;

// نشتق النوع من المصفوفة نفسها: إذا أضفت نوع جديد فوق، ينضاف تلقائياً للـ type
export type CenterType = (typeof CENTER_TYPES)[number];
