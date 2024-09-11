'use client'

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import ContributionForm from '@/components/Forms/ContributionForm';
import { fetchPost } from '@/utils/fetchPost';
import { fetchContribution } from '@/utils/fetchContribution';
import { toast } from '@/hooks/use-toast';
import { Contribution, Post } from '@/types';
import { useSession } from 'next-auth/react';
import { User } from 'next-auth';
 // Adjust import paths as necessary

export default function AddServicesPage({ params }: { params: { id: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [post, setPost] = useState<Post | null>(null);
  const [contributions, setContributions] = useState<Contribution[] | null>(null);
  const [eulogyPrompt, setEulogyPrompt] = useState('');
  const [generatedEulogy, setGeneratedEulogy] = useState('');
  const [isGeneratingEulogy, setIsGeneratingEulogy] = useState(false);
  const { data: session } = useSession()

  useEffect(() => {
    const fetchData = async () => {
      if (!session) {
        router.push('/signin');
        return;
      }
      setUser(session.user);

      const fetchedPost = await fetchPost(params.id);
      if (!fetchedPost) {
        toast({
          title: "Error",
          description: "Failed to load post details.",
          variant: "destructive",
        });
        return;
      }
      setPost(fetchedPost);

      const fetchedContributions = await fetchContribution(params.id);
      setContributions(fetchedContributions);
    };

    fetchData();
  }, [params.id, router,session]);

  const handleGenerateEulogy = async () => {
    setIsGeneratingEulogy(true);
    try {
      // Replace this with actual API call to your AI backend
      const response = await fetch('/api/generate-eulogy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: eulogyPrompt }),
      });
      const data = await response.json();
      setGeneratedEulogy(data.eulogy);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate eulogy. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGeneratingEulogy(false);
    }
  };

  const handleSaveEulogy = async () => {
    try {
      // Replace this with actual API call to save the eulogy
      await fetch('/api/save-eulogy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ postId: params.id, eulogy: generatedEulogy }),
      });
      toast({
        title: "Success",
        description: "Eulogy saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save eulogy. Please try again.",
        variant: "destructive",
      });
    }
  };

  if (!user || !post) {
    return <div>Loading...</div>;
  }

  return (
    <div className="bg-background text-primary min-h-screen flex flex-col mt-24">
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Add Services for {post.title}</h1>
        
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Contributions</h2>
          {contributions && contributions.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {contributions.map((contribution) => (
                <Card key={contribution.id} className="bg-primary-foreground text-primary border-l-4 border-blue-500 hover:shadow-lg transition-shadow duration-300">
                  <CardHeader>
                    <CardTitle>{contribution.channel}</CardTitle>
                    <CardDescription>Contribution ID: {contribution.id}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="font-semibold">Account: {contribution.account_no}</p>
                    <p className="text-sm text-muted-foreground mt-2">
                      Thank you for your generous contribution.
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="bg-primary-foreground text-primary p-6">
              <CardTitle className="mb-2">No contributions yet</CardTitle>
              <CardDescription>Be the first to contribute to this memorial.</CardDescription>
            </Card>
          )}
        </section>

        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Add New Contribution</h2>
          <ContributionForm postId={post.id} />
        </section>

        <section>
          <h2 className="text-2xl font-semibold mb-4">Generate Eulogy</h2>
          <Dialog>
            <DialogTrigger asChild>
              <Button>Generate Eulogy</Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
              <DialogHeader>
                <DialogTitle>Generate Eulogy</DialogTitle>
              </DialogHeader>
              <div className="grid gap-4 py-4">
                <div className="grid grid-cols-4 items-center gap-4">
                  <Label htmlFor="eulogyPrompt" className="col-span-4">
                    Describe the person and their life
                  </Label>
                  <Textarea
                    id="eulogyPrompt"
                    className="col-span-4"
                    placeholder="E.g., John was a loving father of three, passionate about photography, and dedicated 40 years to teaching. He was known for his warm smile and willingness to help others."
                    value={eulogyPrompt}
                    onChange={(e) => setEulogyPrompt(e.target.value)}
                  />
                </div>
              </div>
              <Button onClick={handleGenerateEulogy} disabled={isGeneratingEulogy}>
                {isGeneratingEulogy ? 'Generating...' : 'Generate'}
              </Button>
            </DialogContent>
          </Dialog>

          {generatedEulogy && (
            <Card className="mt-6 bg-primary-foreground text-primary">
              <CardHeader>
                <CardTitle>Generated Eulogy</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="whitespace-pre-wrap">{generatedEulogy}</p>
                <Button className="mt-4" onClick={handleSaveEulogy}>Save Eulogy</Button>
              </CardContent>
            </Card>
          )}
        </section>
      </main>
    </div>
  );
}