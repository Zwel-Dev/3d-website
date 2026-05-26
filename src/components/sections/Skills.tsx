'use client';

import { SceneIntro } from '@/components/skills/SceneIntro';
import { SceneFrontend } from '@/components/skills/SceneFrontend';
import { SceneMotion } from '@/components/skills/SceneMotion';
import { SceneBackend } from '@/components/skills/SceneBackend';
import { SceneAI } from '@/components/skills/SceneAI';
import { SkillsStepper } from '@/components/skills/SkillsStepper';

export function Skills() {
  return (
    <section id="skills" className="relative w-full">
      {/* Wrappers carry the chapter ids the stepper observes for scroll-spy
          and the anchor targets for click-to-jump. Wrapping here (instead of
          editing each scene) keeps the scene files focused on visuals. */}
      <div id="chapter-intro">
        <SceneIntro />
      </div>
      <div id="chapter-frontend">
        <SceneFrontend />
      </div>
      <div id="chapter-motion">
        <SceneMotion />
      </div>
      <div id="chapter-backend">
        <SceneBackend />
      </div>
      <div id="chapter-ai">
        <SceneAI />
      </div>

      <SkillsStepper />
    </section>
  );
}
