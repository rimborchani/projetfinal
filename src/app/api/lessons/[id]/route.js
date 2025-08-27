export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';
import { NextResponse } from 'next/server';
import memoryStorage from '../../../../lib/memoryStorage';
import { neon } from '@neondatabase/serverless';

export async function GET(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);

    // Base de données d'abord (Neon direct)
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (connectionString) {
      try {
        const sql = neon(connectionString);
        const rows = await sql`SELECT id, titre, concept, preview, step1, step2, step3, step4, created_at FROM lessons WHERE id = ${lessonId}`;
        const row = rows[0];
        if (row) {
          const data = memoryStorage.transformLesson({ id: row.id, titre: row.titre, concept: row.concept, preview: row.preview, step1: row.step1, step2: row.step2, step3: row.step3, step4: row.step4 });
          return NextResponse.json({ success: true, data, source: 'database' });
        }
      } catch (e) {
        console.error('❌ DB GET by id erreur:', e.message);
      }
    }
    
    // Fallback vers le stockage mémoire
    console.log(`💾 Recherche de la leçon ${lessonId} en mémoire`);
    const lesson = memoryStorage.getLesson(lessonId);
    
    if (!lesson) {
      return NextResponse.json(
        { success: false, error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }

    const transformedLesson = memoryStorage.transformLesson(lesson);
    return NextResponse.json({ success: true, data: transformedLesson, source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur lors de la récupération de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de récupérer la leçon' },
      { status: 500 }
    );
  }
}

export async function PUT(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);
  const body = await request.json();
  const { titre, concept, preview, step1, step2, step3, step4 } = body;
    
  if (!titre || !step1 || !step2 || !step3 || !step4) {
      return NextResponse.json(
        { success: false, error: 'Tous les champs sont obligatoires' },
        { status: 400 }
      );
    }
    // DB d'abord
  const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
  if (connectionString) {
      try {
        const sql = neon(connectionString);
        const rows = await sql`
          UPDATE lessons
          SET titre = ${titre}, concept = ${concept}, preview = ${preview}, step1 = ${step1}, step2 = ${step2}, step3 = ${step3}, step4 = ${step4}
          WHERE id = ${lessonId}
          RETURNING id, titre, concept, preview, step1, step2, step3, step4, created_at
        `;
        const row = rows[0];
        if (row) {
          const data = memoryStorage.transformLesson({ id: row.id, titre: row.titre, concept: row.concept, preview: row.preview, step1: row.step1, step2: row.step2, step3: row.step3, step4: row.step4 });
          return NextResponse.json({ success: true, data, source: 'database' });
        }
      } catch (e) {
        console.error('❌ DB PUT erreur:', e.message);
      }
    }
    
    // Fallback vers le stockage mémoire
    console.log(`💾 Mise à jour de la leçon ${lessonId} en mémoire`);
  const updatedLesson = memoryStorage.updateLesson(lessonId, titre, concept, preview, step1, step2, step3, step4);
    
    if (!updatedLesson) {
      return NextResponse.json(
        { success: false, error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }
    
  return NextResponse.json({ success: true, data: updatedLesson, source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur lors de la mise à jour de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de mettre à jour la leçon' },
      { status: 500 }
    );
  }
}

export async function DELETE(request, { params }) {
  try {
    const { id } = params;
    const lessonId = parseInt(id);
    // DB d'abord
    const connectionString = process.env.NEON_DATABASE_URL || process.env.DATABASE_URL;
    if (connectionString) {
      try {
        const sql = neon(connectionString);
        const rows = await sql`DELETE FROM lessons WHERE id = ${lessonId} RETURNING id`;
        if (rows.length > 0) {
          return NextResponse.json({ success: true, message: 'Leçon supprimée avec succès', source: 'database' });
        }
      } catch (e) {
        console.error('❌ DB DELETE erreur:', e.message);
      }
    }

    // Fallback vers le stockage mémoire
    console.log(`💾 Suppression de la leçon ${lessonId} de la mémoire`);
    const deleted = memoryStorage.deleteLesson(lessonId);
    
    if (!deleted) {
      return NextResponse.json(
        { success: false, error: 'Leçon non trouvée' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({ success: true, message: 'Leçon supprimée avec succès', source: 'memory' });
  } catch (error) {
    console.error('❌ Erreur lors de la suppression de la leçon:', error);
    return NextResponse.json(
      { success: false, error: 'Impossible de supprimer la leçon' },
      { status: 500 }
    );
  }
}
