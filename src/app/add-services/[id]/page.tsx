import { getCurrentUser } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { fetchPost } from '@/utils/fetchPost';
import { fetchContribution } from '@/utils/fetchContribution';
import ContributionForm from '@/components/Forms/ContributionForm'; // Adjust import paths as necessary
import GenerateEulogy from '@/components/GenerateEulogy'; // Adjust import paths as necessary
import { Card } from '@/components/ui/card';

export default async function AddServicesPage({ params }: { params: { id: string } }) {
  const user = await getCurrentUser();
  const { id } = params;
  const Post = await fetchPost(id);

  if (!user) {
    redirect('/signin');
    return; // Ensure no further code execution after redirect
  }

  if (!Post) {
    return <div>Loading...</div>;
  }

  const contributions = await fetchContribution(Post.id);


  return (
    <div className="bg-background text-primary min-h-screen flex flex-col mt-24">
    <main className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-4">Add Services</h1>
      <div className="flex flex-wrap gap-4">
        {contributions && contributions.length > 0 ? (
          <div className="flex flex-wrap gap-4">
            <h2 className="text-xl font-bold mb-4">Contributions</h2>
            {contributions.map((contribution) => (
              <Card
                key={contribution.id}
                className="bg-primary-foreground text-primary border-l-4 border-blue-500"
              >
                <p>{contribution.channel}</p>
                <p>{contribution.account_no}</p>
              </Card>
            ))}
          </div>
        ) : (
          <div>No contributions yet</div>
        )}
      </div>
      <ContributionForm postId={Post.id} />
      <GenerateEulogy />
    </main>
  </div>
  );
}
