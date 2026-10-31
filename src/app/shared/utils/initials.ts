/** 'د. ليلى الحلبي' → 'ل ح' (بمسافة، لأن الحروف العربية بتلتصق ببعض بدونها) */
export function initialsOf(name: string): string {
  return name.replace(/^د\.?\s*/, '').split(/\s+/).slice(0, 2).map(w => w[0]).join(' ');
}
