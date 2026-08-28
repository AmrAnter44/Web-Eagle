/**
 * Website-side display-name overrides for branches.
 *
 * The `branches` table in Supabase is shared with other systems, so names are
 * corrected here rather than in the database. Keyed by branch slug; any branch
 * not listed keeps whatever the DB returns.
 */
export const BRANCH_NAME_OVERRIDES = {
  // DB still stores 'Qoopa Branch' / 'فرع قوبا'
  qoopa: { name_en: 'Hadayek El Qobba', name_ar: 'حدائق القبة' }
};

/**
 * Apply the overrides to branch rows fetched from Supabase.
 * Returns a new array; rows without an override pass through untouched.
 */
export function applyBranchNameOverrides(branches) {
  if (!Array.isArray(branches)) return [];

  return branches.map((branch) => {
    const override = BRANCH_NAME_OVERRIDES[branch?.slug];
    return override ? { ...branch, ...override } : branch;
  });
}
