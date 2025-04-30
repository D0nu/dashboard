'use client';
import { useEffect, useState } from 'react';

export const FooterLinksBox = () => {
  const [forumData, setForumData] = useState([]);

  useEffect(() => {
    // Mock forum data - replace with actual API call
    const mockForumData = [
      {
        title: "A Framework for Governance - Introduction",
        category: "Governance",
        tags: ["Proposal", "Discussion"],
        replies: "4.0k",
        views: "12.3k",
        activity: "11d",
        excerpt: "Solana has reached a certain level of maturity, with almost 3.5yrs of Mainnet-Beta, the development of an independent...",
        url: "#"
      }
    ];
    
    setForumData(mockForumData);
  }, []);

  return (
    <div className="bg-sub-1 rounded-3xl shadow-sm border border-sub-1 p-6 h-full">
      <h3 className="text-white text-lg font-semibold mb-6">Forums & Newsletter</h3>
      
      <div className="space-y-6">
        <div className="bg-dark-sub-1 rounded-xl p-4">
          <h4 className="text-primary-2 text-sm font-medium mb-4">Topics</h4>
          
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="text-sub-2 text-xs border-b border-sub-2/20">
                  <th className="pb-3 text-left">Forums</th>
                  <th className="pb-3 text-left">Governance</th>
                  <th className="pb-3 text-left">Tags</th>
                  <th className="pb-3 text-right">Replies</th>
                  <th className="pb-3 text-right">Views</th>
                  <th className="pb-3 text-right">Activity</th>
                </tr>
              </thead>
              <tbody>
                {forumData.map((post, index) => (
                  <tr key={index} className="border-b border-sub-2/10 hover:bg-sub-2/5 transition-colors">
                    <td className="py-4">
                      <a href={post.url} className="text-primary-2 hover:text-primary-1 transition-colors">
                        {post.title}
                      </a>
                    </td>
                    <td className="py-4 text-sub-2">{post.category}</td>
                    <td className="py-4">
                      <div className="flex gap-2">
                        {post.tags.map((tag, tagIndex) => (
                          <span key={tagIndex} className="px-2 py-1 bg-sub-2/10 text-sub-2 rounded text-xs">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="py-4 text-right text-sub-2">{post.replies}</td>
                    <td className="py-4 text-right text-sub-2">{post.views}</td>
                    <td className="py-4 text-right text-sub-2">{post.activity}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="bg-dark-sub-1 rounded-xl p-4">
          <div className="flex justify-between items-start">
            <div>
              <h4 className="text-primary-2 text-sm font-medium mb-2">Latest Update</h4>
              <p className="text-sub-2 text-sm">
                {forumData[0]?.excerpt || ''}
                <a href="#" className="text-primary-2 hover:text-primary-1 ml-2">read more</a>
              </p>
            </div>
            <div className="text-sub-2 text-xs">4.0k Replies</div>
          </div>
        </div>

        <div className="bg-dark-sub-1 rounded-xl p-4">
          <h4 className="text-primary-2 text-sm font-medium mb-4">Newsletter</h4>
          <div className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 bg-sub-1 text-sub-2 rounded-lg px-4 py-2 focus:outline-none"
            />
            <button className="bg-primary-2 text-primary-1 px-6 py-2 rounded-lg hover:bg-primary-2/90 transition-colors">
              Subscribe
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};