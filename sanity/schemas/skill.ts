import { defineField, defineType } from 'sanity';

export const skill = defineType({
  name: 'skill',
  title: 'Skill',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Skill Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          { title: 'Languages', value: 'languages' },
          { title: 'Frameworks', value: 'frameworks' },
          { title: 'Tools', value: 'tools' },
          { title: 'Databases', value: 'databases' },
          { title: 'Cloud', value: 'cloud' },
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'level',
      title: 'Proficiency Level',
      type: 'number',
      description: 'Rate from 1-10',
      validation: (Rule) => Rule.min(1).max(10),
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'category',
    },
  },
});