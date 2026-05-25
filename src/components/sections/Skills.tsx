'use client';

import { SceneIntro } from '@/components/skills/SceneIntro';
import { SceneFrontend } from '@/components/skills/SceneFrontend';
import { SceneMotion } from '@/components/skills/SceneMotion';
import { SceneBackend } from '@/components/skills/SceneBackend';
import { SceneAI } from '@/components/skills/SceneAI';

export function Skills() {
  return (
    <section id="skills" className="relative w-full">
      <SceneIntro />
      <SceneFrontend />
      <SceneMotion />
      <SceneBackend />
      <SceneAI />
    </section>
  );
}
