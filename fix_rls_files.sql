-- ==========================================
-- CORREÇÃO DE RLS: HUB DE ARQUIVOS
-- ==========================================

-- 1. Ativar RLS na tabela client_files
ALTER TABLE client_files ENABLE ROW LEVEL SECURITY;

-- 2. Políticas para a tabela client_files
DROP POLICY IF EXISTS "Admins can manage all client files" ON client_files;
CREATE POLICY "Admins can manage all client files" ON client_files
  FOR ALL USING (is_admin());

DROP POLICY IF EXISTS "Clients can see their own files" ON client_files;
CREATE POLICY "Clients can see their own files" ON client_files
  FOR SELECT USING (
    client_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid())
  );

DROP POLICY IF EXISTS "Clients can upload their own files" ON client_files;
CREATE POLICY "Clients can upload their own files" ON client_files
  FOR INSERT WITH CHECK (
    client_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid())
  );

DROP POLICY IF EXISTS "Clients can delete their own files" ON client_files;
CREATE POLICY "Clients can delete their own files" ON client_files
  FOR DELETE USING (
    client_id IN (SELECT id FROM profiles WHERE auth_id = auth.uid())
  );

-- 3. Políticas de Storage para o bucket 'documents'
-- Nota: Certifique-se de que o bucket 'documents' foi criado no painel do Supabase.

-- Permitir que usuários autenticados façam upload na sua própria pasta (auth.uid())
DROP POLICY IF EXISTS "Allow authenticated uploads to documents" ON storage.objects;
CREATE POLICY "Allow authenticated uploads to documents" ON storage.objects
  FOR INSERT TO authenticated
  WITH CHECK (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir que usuários vejam/baixem seus próprios documentos
DROP POLICY IF EXISTS "Allow users to view their own documents" ON storage.objects;
CREATE POLICY "Allow users to view their own documents" ON storage.objects
  FOR SELECT TO authenticated
  USING (bucket_id = 'documents' AND (storage.foldername(name))[1] = auth.uid()::text);

-- Permitir que Admins vejam/gerenciem TUDO no bucket documents
DROP POLICY IF EXISTS "Allow admins to manage all documents" ON storage.objects;
CREATE POLICY "Allow admins to manage all documents" ON storage.objects
  FOR ALL TO authenticated
  USING (bucket_id = 'documents' AND (SELECT is_admin()));
