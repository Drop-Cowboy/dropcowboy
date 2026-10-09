import AxeBuilder from '@axe-core/playwright';
import { expect } from '@playwright/test';

// Fails on serious and critical WCAG 2.1 A/AA violations. Axe also looks
// inside open shadow roots, so this covers the Drop Cowboy widgets as well as
// the sample's own markup.
export async function expectAccessible(page) {
    const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
    const blocking = results.violations.filter((v) => v.impact === 'serious' || v.impact === 'critical');
    const report = blocking.map((v) => v.impact + ' ' + v.id + ': ' + v.help + '\n'
        + v.nodes.slice(0, 5).map((node) => '    ' + node.target.join(' >>> ')).join('\n'));
    expect(report, 'Accessibility violations on ' + page.url()).toEqual([]);
}
