import fs from 'fs';
import path from 'path';

export async function GET(request: Request) {
  const filePath = path.join(
    process.cwd(),
    'components',
    'mock_data',
    'user_data.json',
  );

  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);

    return new Response(JSON.stringify(parsedData), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    return new Response(JSON.stringify({ error: (err as Error).message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}
