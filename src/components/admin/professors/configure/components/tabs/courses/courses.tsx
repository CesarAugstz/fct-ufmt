import { Button } from '@/components/ui/button'
import { Card, CardContent } from '@/components/ui/card'
import { PlusCircle, Trash2 } from 'lucide-react'

export default function CoursesTab() {
  return (
    <Card>
      <CardContent className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-medium">Your Courses</h3>
          <Button>
            <PlusCircle className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">
                  Introduction to Artificial Intelligence
                </h4>
                <p className="text-sm text-muted-foreground">
                  CS101 • Undergraduate
                </p>
                <p className="text-sm mt-2">
                  An introduction to the fundamental concepts of artificial
                  intelligence.
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">Advanced Machine Learning</h4>
                <p className="text-sm text-muted-foreground">
                  CS401 • Graduate
                </p>
                <p className="text-sm mt-2">
                  Advanced topics in machine learning algorithms and
                  applications.
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="border rounded-lg p-4 hover:shadow-md transition-shadow bg-white">
            <div className="flex justify-between">
              <div>
                <h4 className="font-medium">Data Science Fundamentals</h4>
                <p className="text-sm text-muted-foreground">
                  CS201 • Undergraduate
                </p>
                <p className="text-sm mt-2">
                  Introduction to data analysis, visualization, and statistical
                  methods.
                </p>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
