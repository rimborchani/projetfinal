export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import memoryStorage from '../../../lib/memoryStorage';
import { neon } from '@neondatabase/serverless';

// Transformer un enregistrement DB -> format UI
function toUiLesson(row) {
  return {
    id: row.id,
    title: row.titre,
    concept: row.concept || row.step1,
    preview: row.preview || '',
    tasks: [
      { id: 1, instruction: row.step1, blockType: 'event_whenflagclicked', category: 'Events', blockImage: '/blocks/when-flag-clicked.png', hint: 'Commencez par cliquer sur le drapeau vert!' },
      { id: 2, instruction: row.step2, blockType: 'motion_movesteps', category: 'Motion', blockImage: '/blocks/move-steps.png', hint: 'Utilisez les blocs de mouvement pour déplacer votre personnage.' },
      { id: 3, instruction: row.step3, blockType: 'control_repeat', category: 'Control', blockImage: '/blocks/repeat.png', hint: 'Les boucles vous permettent de répéter des actions.' },
      { id: 4, instruction: row.step4, blockType: 'looks_say', category: 'Looks', blockImage: '/blocks/say.png', hint: 'Ajoutez des dialogues pour rendre votre animation plus vivante.' }
    ]
  };
}

// GET /api/lessons
export async function GET() {
  try {
    console.log('📡 API GET /api/lessons - Début de la requête');
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (connectionString) {
      try {
        const sql = neon(connectionString);
        const rows = await sql`SELECT id, titre, concept, preview, step1, step2, step3, step4, created_at FROM lessons ORDER BY id`;
        console.log(`✅ ${rows.length} leçon(s) depuis la base de données`);
        return NextResponse.json({ success: true, data: rows.map(toUiLesson), source: 'database' });
      } catch (e) {
        console.error('❌ DB GET erreur:', e.message);
      }
    } else {
      console.log('❌ Aucune URL DB configurée');
    }

    // Fallback mémoire
    const memoryLessons = memoryStorage.transformAllLessons();
    console.log(`💾 ${memoryLessons.length} leçon(s) depuis la mémoire`);
    return NextResponse.json({ success: true, data: memoryLessons, source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur GET /api/lessons:', error);
    return NextResponse.json({ success: false, error: 'Impossible de récupérer les leçons' }, { status: 500 });
  }
}

// POST /api/lessons
export async function POST(request) {
  try {
    console.log("📡 API POST /api/lessons - Création d'une nouvelle leçon");
    const body = await request.json();
    const { titre, concept, preview, step1, step2, step3, step4 } = body || {};

    if (!titre || !concept || !preview || !step1 || !step2 || !step3 || !step4) {
      return NextResponse.json({ success: false, error: 'Tous les champs sont obligatoires' }, { status: 400 });
    }

  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (connectionString) {
      try {
        const sql = neon(connectionString);
        const rows = await sql`
          INSERT INTO lessons (titre, concept, preview, step1, step2, step3, step4)
          VALUES (${titre}, ${concept}, ${preview}, ${step1}, ${step2}, ${step3}, ${step4})
          RETURNING id, titre, concept, preview, step1, step2, step3, step4, created_at
        `;
        const created = rows[0];
        console.log('✅ Leçon créée DB ID:', created?.id);
        return NextResponse.json({ success: true, data: toUiLesson(created), source: 'database' }, { status: 201 });
      } catch (e) {
        console.error('❌ DB POST erreur:', e.message);
      }
    }

    // Fallback mémoire si DB indisponible
    const newLesson = memoryStorage.createLesson(titre, concept, preview, step1, step2, step3, step4);
    return NextResponse.json({ success: true, data: memoryStorage.transformLesson(newLesson), source: 'memory' }, { status: 201 });
  } catch (error) {
    console.error('❌ Erreur POST /api/lessons:', error);
    return NextResponse.json({ success: false, error: 'Impossible de créer la leçon' }, { status: 500 });
  }
}
